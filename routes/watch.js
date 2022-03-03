module.exports = function(req, res) {
    // sess = req.session;
    // if(sess.email == 'admin') {
        var getparams       = req.params.action;
        const fs            = require("fs");
        const sqlite3       = require('sqlite3').verbose();
        const db            = new sqlite3.Database('./db/episode.db');
        const config        = require('../config');

        if(req.headers['x-forwarded-proto'] == 'https'){
            var host = `https://${req.get('host')}`;
        }
        else {
            var host = `http://${req.get('host')}`;
        }


        db.serialize( function() {
            db.get(`SELECT * FROM episode WHERE e_link = ? LIMIT 1`,[getparams], function(err, row) {
                if (row != null) {                                
                    fs.readFile('views/watch.html', 'utf8', (err, test) => {
                        var scrpp = JSON.stringify(row).toString().replace(/\"e_/g,'"');
                        res.send(test.replace('anime_video = \'\'',`anime_video = '${scrpp}'`).replace('anime_token = ""',`anime_token = "ge${row.e_animeid}"`).replace(/###URL###/g, host ));
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