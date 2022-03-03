module.exports = function(req, res) {
    // sess = req.session;
    // if(sess.email == 'admin') {
        const sqlite3       = require('sqlite3').verbose();
        const dba           = new sqlite3.Database('./db/data.db');
        const dbe           = new sqlite3.Database('./db/episode.db');
        const fs            = require("fs");

        const config        = require('../config');
        var getparams       = req.params.action;

        if(getparams == 'completed'){
            dba.all('SELECT * FROM anime WHERE a_status = ? ORDER BY a_season DESC LIMIT 15',['Completed'], (err, rows) => {
                if(err) {
                    res.header('Content-Type', 'text/html').status(404).send('Error 404');
                }
                else {
                    var todata = [];
                    rows.forEach((row)=>{
                        todata += '{ "id": "'+row.a_id+'", "link": "'+row.a_link+'", "judul": "'+row.a_judul+'", "genre": "'+row.a_genre+'", "season": "'+row.a_season+'", "tipe": "'+row.a_type+'", "rating": "'+row.a_rating +'", "released": "'+row.a_released +'", "studio": "'+row.a_studio +'", "score": "'+row.a_score +'", "keyword": "'+row.a_keyword +'", "thumb": "'+row.a_thumbnail +'", "alternatif": "'+row.a_alter +'", "sinopsis": "'+row.a_sinopsis +'"},';
                    });
                    var toleng = todata.toString().length; 
                    var data = `{ 
"data": [
`+
todata.substr(0, Math.floor(Math.floor(toleng) - 1) )
+`
]
}`;
                    res.status(200).header('Content-Type', 'application/json').send(data);
                }
            })
        }
        else if (getparams == 'ongoing') {
            dba.all('SELECT * FROM anime WHERE a_status = ? ORDER BY a_season DESC LIMIT 15',['Ongoing'], (err, rows) => {
                if(err) {
                    res.header('Content-Type', 'text/html').status(404).send('Error 404');
                }
                else {
                    var todata = [];
                    rows.forEach((row)=>{
                        todata += '{ "id": "'+row.a_id+'", "link": "'+row.a_link+'", "judul": "'+row.a_judul+'", "genre": "'+row.a_genre+'", "season": "'+row.a_season+'", "tipe": "'+row.a_type+'", "rating": "'+row.a_rating +'", "released": "'+row.a_released +'", "studio": "'+row.a_studio +'", "score": "'+row.a_score +'", "keyword": "'+row.a_keyword +'", "thumb": "'+row.a_thumbnail +'", "alternatif": "'+row.a_alter +'", "sinopsis": "'+row.a_sinopsis +'"},';
                    });
                    var toleng = todata.toString().length; 
                    var data = `{ 
"data": [
`+
todata.substr(0, Math.floor(Math.floor(toleng) - 1) )
+`
]
}`;
                    res.status(200).header('Content-Type', 'application/json').send(data);
                }
            })
        } 
        else if (getparams == 'rateslide') {
            dba.all('SELECT * FROM anime ORDER BY a_score DESC LIMIT 10',[], (err, rows) => {
                if(err) {
                    res.header('Content-Type', 'text/html').status(404).send('Error 404');
                }
                else {
                    var todata = [];
                    rows.forEach((row)=>{
                        todata += '{ "id": "'+row.a_id+'", "link": "'+row.a_link+'", "judul": "'+row.a_judul+'", "genre": "'+row.a_genre+'", "season": "'+row.a_season+'", "tipe": "'+row.a_type+'", "rating": "'+row.a_rating +'", "released": "'+row.a_released +'", "studio": "'+row.a_studio +'", "score": "'+row.a_score +'", "keyword": "'+row.a_keyword +'", "thumb": "'+row.a_thumbnail +'", "alternatif": "'+row.a_alter +'", "sinopsis": "'+row.a_sinopsis +'", "stat": "'+row.a_status +'"},';
                    });
                    var toleng = todata.toString().length; 
                    var data = `{ 
"data": [
`+
todata.substr(0, Math.floor(Math.floor(toleng) - 1) )
+`
]
}`;
                    res.status(200).header('Content-Type', 'application/json').send(data);
                }
            })
        }
        else if (getparams == 'animelist') {
            dba.all('SELECT * FROM anime ORDER BY a_judul ASC LIMIT 30',[], (err, rows) => {
                if(err) {
                    res.header('Content-Type', 'text/html').status(404).send('Error 404');
                }
                else {
                    var todata = [];
                    rows.forEach((row)=>{
                        todata += '{ "id": "'+row.a_id+'", "link": "'+row.a_link+'", "judul": "'+row.a_judul+'", "genre": "'+row.a_genre+'", "season": "'+row.a_season+'", "tipe": "'+row.a_type+'", "rating": "'+row.a_rating +'", "released": "'+row.a_released +'", "studio": "'+row.a_studio +'", "score": "'+row.a_score +'", "keyword": "'+row.a_keyword +'", "thumb": "'+row.a_thumbnail +'", "alternatif": "'+row.a_alter +'", "sinopsis": "'+row.a_sinopsis +'", "stat": "'+row.a_status +'"},';
                    });
                    var toleng = todata.toString().length; 
                    var data = `{ 
"data": [
`+
todata.substr(0, Math.floor(Math.floor(toleng) - 1) )
+`
]
}`;
                    res.status(200).header('Content-Type', 'application/json').send(data);
                }
            })
        }

        else if (getparams.match(/animelist-([0-9]+)/) ) {
            var page    = getparams.split('-')[1];
            var offset  = ( (page*30) );
            // console.log(offset);

            dba.all('SELECT * FROM anime ORDER BY a_judul ASC LIMIT 30 OFFSET '+offset,[], (err, rows) => {
                if(err) {
                    res.header('Content-Type', 'text/html').status(404).send('Error 404');
                }
                else {
                    var todata = [];
                    rows.forEach((row)=>{
                        todata += '{ "id": "'+row.a_id+'", "link": "'+row.a_link+'", "judul": "'+row.a_judul+'", "genre": "'+row.a_genre+'", "season": "'+row.a_season+'", "tipe": "'+row.a_type+'", "rating": "'+row.a_rating +'", "released": "'+row.a_released +'", "studio": "'+row.a_studio +'", "score": "'+row.a_score +'", "keyword": "'+row.a_keyword +'", "thumb": "'+row.a_thumbnail +'", "alternatif": "'+row.a_alter +'", "sinopsis": "'+row.a_sinopsis +'", "stat": "'+row.a_status +'"},';
                    });
                    var toleng = todata.toString().length; 
                    var data = `{ 
"data": [
`+
todata.substr(0, Math.floor(Math.floor(toleng) - 1) )
+`
]
}`;
                    res.status(200).header('Content-Type', 'application/json').send(data);
                }
            })
        }
        else if (getparams == 'total') {
            dba.all('SELECT COUNT(*) FROM anime',[], (err, rows) => {
                if(err) {
                    res.header('Content-Type', 'text/html').status(404).send('Error 404');
                }
                else {
                    res.status(200).send( eval(rows[0]) );
                }
            })
        }
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
        else if (getparams.match(/ge(\s*\w){1,}\s*$/)) {
            var id = getparams.toString().replace(/ge/,'');
            dbe.all('SELECT * FROM episode WHERE e_animeid = ? ORDER BY e_link DESC',[id], (err, rows) => {
                if(!rows) {
                    res.header('Content-Type', 'text/html').status(404).send('Error 404');
                }
                else {
                    res.send(JSON.stringify(rows).toString().replace(/\"e_/g,'"'));
//                     var todata = [];
//                     rows.forEach((row)=>{
//                         todata += '{ "id": "'+row.e_id+'", "cid": "'+row.e_animeid+'", "link": "'+row.e_link+'", "media": "'+row.e_media+'", "judul": "'+row.e_judul+'"},';
//                     });
//                     var toleng = todata.toString().length; 
//                     var data = `{ 
// "data": [
// `+
// todata.substr(0, Math.floor(Math.floor(toleng) - 1) )
// +`
// ]
// }`;
                    // res.status(200).header('Content-Type', 'application/json').send(data);
                }
            })
        } 
        else if (getparams.match(/abj-[a-zA-Z]{1}$/)) {
            var id = getparams.toString().replace(/abj-/,'');
            dba.all(`SELECT * FROM anime WHERE a_judul LIKE "${id}%" ORDER BY a_link DESC`, (err, rows) => {
                if(!rows) {
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

    // }
    // else res.header('Content-Type', 'text/html').status(404).send('Error 404');


}