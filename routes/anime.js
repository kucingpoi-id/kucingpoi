module.exports = function(req, res) {
    // sess = req.session;
    // if(sess.email == 'admin') {
        var getparams       = req.params.action;
        const fs            = require("fs");
        const sqlite3       = require('sqlite3').verbose();
        const db            = new sqlite3.Database('./db/data.db');
        const config        = require('../config');

        if(req.headers['x-forwarded-proto'] == 'https'){
            var host = `https://${req.get('host')}`;
        }
        else {
            var host = `http://${req.get('host')}`;
        }


        db.serialize( function() {
            db.get(`SELECT * FROM anime WHERE a_link = ? LIMIT 1`,[getparams], function(err, row) {
                if (row != null) {
                    fs.readFile('views/anime.html', 'utf8', (err, test) => {
                        res.send(test.replace('anime_token = ""',`anime_token = "ll${row.a_id}"`).replace(/###URL###/g, host ));
                        if (err) console.error(err)
                    });
                }
                else {
                    fs.readFile('views/404.html', 'utf8', (err, test) => {
                        if (err) {
                            console.error(err)
                            res.header('Content-Type', 'text/html').status(404).send('Error 404');

                        }
                        else res.header('Content-Type', 'text/html').status(404).send(test.replace(/###URL###/g, host ));
                    });
                }
            });
        });
    // }
    // else if(sess.email !== 'admin') res.redirect('/');
    // else res.header('Content-Type', 'text/html').status(404).send('Error 404');
}