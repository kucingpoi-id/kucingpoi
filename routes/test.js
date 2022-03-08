module.exports = function(req, res) {
    
    const sqlite3       = require('sqlite3').verbose();
    const db            = new sqlite3.Database('./db/data.db');

    db.serialize( function() {
        var flpage      = JSON.stringify(req.query) !== '{}' ? JSON.stringify(req.query) : null ;
        var tnum        = ( flpage && flpage.match(/\{\"([0-9]{1,})\"\:/) ) ? flpage.match(/\{\"([0-9]{1,})\"\:/)[1] : null;
        var page        = tnum ? tnum : '0';
        var offset      = ( ( page - 1) * 30);

        // console.log( "offset: "+offset+" page: "+ page )
        
        db.all(`SELECT * FROM anime ORDER BY a_link ASC LIMIT 30 OFFSET ${offset}`, function(err, rows) {
            if (rows && rows != null) {
                res.render('layouts/test',{
                    forcheck: page,
                    jsoncontent: JSON.stringify(rows).toString().replace(/\"a_/g,'"').toString()
                });
            }
            else {
                res.render('layouts/404');
            }
        });
    });


}