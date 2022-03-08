module.exports = function(req, res) {
    
    var getparams       = req.params.action;
    // const fs            = require("fs");
    const sqlite3       = require('sqlite3').verbose();
    const db            = new sqlite3.Database('./db/data.db');

    db.serialize( function() {
        db.get(`SELECT * FROM anime WHERE a_link = ? LIMIT 1`,[getparams], function(err, row) {
            console.log(getparams)
            if (!row && row != null) {
                res.render('layouts/detail',{
                    animetoken: 'll'+row.a_id
                });
            }
            else {
                res.render('layouts/404');
            }
        });
    });


}