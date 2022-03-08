module.exports = function(req, res) {
    
    var getparams       = req.params.action;
    // const fs            = require("fs");
    const sqlite3       = require('sqlite3').verbose();
    const db            = new sqlite3.Database('./db/episode.db');

    db.serialize( function() {
        db.get(`SELECT * FROM episode WHERE e_link = ? LIMIT 1`,[getparams], function(err, row) {
            if (row != null) {
                db.all(`SELECT * FROM episode WHERE e_animeid = ?`,[row.e_animeid], function(err, epis) {
                    var epd = JSON.stringify(epis).toString().replace(/\"e_/g,'"');
                    var avm = JSON.stringify(row).toString().replace(/\"e_/g,'"');
                    // console.log(epd)
                    res.render('layouts/watch',{
                        animevideo: avm,
                        episodelist: epd
                    });
                })
            }
            else {
                res.render('layouts/404');
            }
        });
    });

}