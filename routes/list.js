module.exports = function(req, res) {
    
    const sqlite3       = require('sqlite3').verbose();
    const db            = new sqlite3.Database('./db/data.db');
    const dbe           = new sqlite3.Database('./db/episode.db');

    db.serialize( function() {
        var flpage      = JSON.stringify(req.query) !== '{}' ? JSON.stringify(req.query) : null ;
        var tnum        = ( flpage && flpage.match(/\{\"([0-9]{1,})\"\:/) ) ? flpage.match(/\{\"([0-9]{1,})\"\:/)[1] : null;
        var page        = tnum ? tnum : '0';
        var offset      = ( ( page - 1) * 30);

        var getparams       = JSON.stringify(req.params.action) !== '{}' ? JSON.stringify(req.params.action) : null ;
        
        if (getparams) {
            // SELECT DETAIL
            db.get(`SELECT * FROM anime WHERE a_link = ${getparams} LIMIT 1`, function(err, rows) {
                // console.log(rows.a_id)
                if(rows && rows != null) {
                    // res.send(JSON.stringify(sel).toString().replace(/\"a_/g,'"'));
                    dbe.all('SELECT * FROM episode WHERE e_animeid = ? ORDER BY e_link DESC',[rows.a_id], (err, rows2) => {
                        // console.log(rows2)
                        if(rows2 && rows2 != null) {
                            db.all(`SELECT * FROM anime WHERE ( a_id = ${(rows.a_id-1)} OR a_id = ${(rows.a_id+1)} )`, function(err, rows3) {
                                // console.log(rows3)
                                res.render('layouts/detail',{
                                    contentanim: JSON.stringify(rows).toString().replace(/\"a_/g,'"'),
                                    contentepis: JSON.stringify(rows2).toString().replace(/\"e_/g,'"'),
                                    contentante: JSON.stringify(rows3).toString().replace(/\"a_/g,'"')
                                });
                            })
                        }
                        else {
                            res.header('Content-Type', 'text/html').status(404).send('Error 404');
                        }
                    })
                }
                else {
                    res.header('Content-Type', 'text/html').status(404).send('Error 404');
                }

            });
        }
        else {
            // LIST ALL
            db.all(`SELECT * FROM anime ORDER BY a_link ASC LIMIT 30 OFFSET ${offset}`, function(err, rows) {
                if (rows && rows != null) {
                    db.get('SELECT COUNT(*) FROM anime',[], (err, total) => {
                        if(total && total != null) {
                            // console.log(JSON.stringify(total["COUNT(*)"]).toString())
                            res.render('layouts/list',{
                                totalpage: JSON.stringify(total["COUNT(*)"]).toString(),
                                forcheck: page,
                                jsoncontent: JSON.stringify(rows).toString().replace(/\"a_/g,'"')
                            });
                            // res.status(200).send( eval(rows[0]) );
                        }
                        else {
                            res.header('Content-Type', 'text/html').status(404).send('Error 404');
                        }
                    })
                }
                else {
                    res.render('layouts/404');
                }
            });
        }
    });


}