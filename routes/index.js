module.exports = function(req, res) {
    
    const sqlite3       = require('sqlite3').verbose();
    const db            = new sqlite3.Database('./db/data.db');

    db.serialize( function() {
        var com = '';
        var ong = '';
        var sli = '';

        db.all('SELECT * FROM anime WHERE a_status = ? ORDER BY a_season DESC LIMIT 15',['Completed'], (err, rows1) => {
            if(err) {
                res.header('Content-Type', 'text/html').status(404).send('Error 404');
            }
            else {
                // res.send(JSON.stringify(rows).toString().replace(/\"a_/g,'"'));
                db.all('SELECT * FROM anime WHERE a_status = ? ORDER BY a_season DESC LIMIT 15',['Ongoing'], (err, rows2) => {
                    if(err) {
                        res.header('Content-Type', 'text/html').status(404).send('Error 404');
                    }
                    else {
                        // res.send(JSON.stringify(rows).toString().replace(/\"a_/g,'"'));
                        db.all('SELECT * FROM anime ORDER BY a_score DESC LIMIT 10',[], (err, rows3) => {
                            if(err) {
                                res.header('Content-Type', 'text/html').status(404).send('Error 404');
                            }
                            else {
                                // res.send(JSON.stringify(rows).toString().replace(/\"a_/g,'"'));
                                var completed;
                                var ongoing;
                                var slider;
                                ong = JSON.stringify(rows2).toString().replace(/\"a_/g,'"');
                                sli = JSON.stringify(rows3).toString().replace(/\"a_/g,'"')
                                com = JSON.stringify(rows1).toString().replace(/\"a_/g,'"');
                                // console.log(com +" >> "+ ong +" >> "+ sli)
                                res.render('layouts/index',{
                                    contentong: ong,
                                    contentcom: com,
                                    contentsli: sli
                                });
                            }
                        })
                    }
                })
            }
        })
        


    });
}