const { get } = require('express/lib/request');
const keystore = require('node-jose/lib/jwk/keystore');

module.exports = function(req, res) {
        const sqlite3       = require('sqlite3').verbose();
        const dba           = new sqlite3.Database('./db/data.db');
        const dbe           = new sqlite3.Database('./db/episode.db');
        const fs            = require("fs");
        var getparams       = req.params.action;

        // GENRE
        if (getparams == 'genre') {
            dba.all(`SELECT g_link,g_genre FROM genre`, (err, rows) => {
                if(!rows) {
                    res.header('Content-Type', 'text/html').status(404).send('Error 404');
                }
                else {
                    res.send(JSON.stringify(rows).toString().replace(/\"g_/g,'"'));
                }
            })
        } 

        // TOTAL FOR PAGE
        // else if (getparams == 'total') {
        //     dba.all('SELECT COUNT(*) FROM anime',[], (err, rows) => {
        //         if(err) {
        //             res.header('Content-Type', 'text/html').status(404).send('Error 404');
        //         }
        //         else {
        //             res.status(200).send( eval(rows[0]) );
        //         }
        //     })
        // }

        // DETAIL
        else if (getparams.match(/ll(\s*\w){1,}\s*$/)) {
            var id = getparams.toString().replace(/ll/,'');
            dba.get(`SELECT * FROM anime WHERE a_id = ? LIMIT 1`,[id], function(err, rows) {
                if(!rows) {
                    res.header('Content-Type', 'text/html').status(404).send('Error 404');
                }
                else {
                    res.send(JSON.stringify(rows).toString().replace(/\"a_/g,'"'));
                }

            });
            dba.close();
        }

        // WATCH
        else if (getparams.match(/ge(\s*\w){1,}\s*$/)) {
            var id = getparams.toString().replace(/ge/,'');
            dbe.all('SELECT * FROM episode WHERE e_animeid = ? ORDER BY e_link DESC',[id], (err, rows) => {
                if(!rows) {
                    res.header('Content-Type', 'text/html').status(404).send('Error 404');
                }
                else {
                    res.send(JSON.stringify(rows).toString().replace(/\"e_/g,'"'));
                }
            })
        } 

        // ABC
        else if (getparams.match(/abj-[a-zA-Z]{1}$/)) {
            var id = getparams.toString().replace(/abj-/,'');
            dba.all(`SELECT * FROM anime WHERE a_judul LIKE "${id}%" ORDER BY a_link ASC`, (err, rows) => {
                if(!rows) {
                    res.header('Content-Type', 'text/html').status(404).send('Error 404');
                }
                else {
                    res.send(JSON.stringify(rows).toString().replace(/\"a_/g,'"'));
                }
            })
        } 

        // GENRE
        else if (getparams.match(/^genre-[a-zA-Z]{2,}$/)) {
            var id = getparams.toString().replace(/genre-/,'');
            // console.log(id);
            dba.all(`SELECT * FROM anime WHERE a_genre LIKE "%${id}%" ORDER BY a_link ASC`, (err, rows) => {
                if(!rows && rows) {
                    res.header('Content-Type', 'text/html').status(404).send('Error 404');
                }
                else {
                    res.send(JSON.stringify(rows).toString().replace(/\"a_/g,'"'));
                }
            })
        } 

        // SEASON
        else if (getparams.match(/season-([2001-2030])/)) {
            var id = getparams.toString().replace(/season-/,'');
            dba.all(`SELECT * FROM anime WHERE a_season = '${id}' ORDER BY a_link ASC`, (err, rows) => {
                if(rows[0] == undefined) {
                    res.header('Content-Type', 'text/html').status(404).send('Error 404');
                }
                else {
                    res.send(JSON.stringify(rows).toString().replace(/\"a_/g,'"'));
                }
            })
        } 

        else {
            res.header('Content-Type', 'text/html').status(404).send('Error 404');
        }

}