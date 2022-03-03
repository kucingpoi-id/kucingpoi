const fs            = require('fs');
const sqlite3       = require('sqlite3').verbose();
const dbuser        = new sqlite3.Database('./db/data.db');
const dblogs        = new sqlite3.Database('./db/episode.db');

const animex        = JSON.parse(fs.readFileSync('episode.json'));

// const animex        = anime.data[0].link;

animex.data.forEach(anime => {
    // console.log(anime.studio);
    dbuser.get(`SELECT * FROM anime WHERE a_link = ? LIMIT 1`,[anime.b_link], function(err, rows) {
    // dblogs.serialize(function() {
        function ucfirst(num) {
            return num.charAt(0).toUpperCase() + num.slice(1);
        }
        // dblogs.run(`INSERT INTO episode(e_animeid,e_link,e_media,e_judul ) VALUES(?, ?, ?, ?)`, [
        //     rows.a_link, anime.b_episode, anime.b_episode+'.mp4', anime.b_episode.replace(/-/g,' ').split(' ').map(ucfirst).join(' ')
        // ], function(err) {
        //     if (err) {
        //         return console.log(err.message);
        //     }
        // });

        dblogs.run(`UPDATE episode SET e_animeid = ? WHERE e_link = ?`, [
            rows.a_id, anime.b_episode
        ], function(err) {
            if (err) {
                return console.log(err.message);
            }
        });

    });
});

// dblogs.close();


// const animex        = anime.data[0].link;

// animel.data.forEach(anime => {
    // console.log(anime.studio);
    // dbuser.serialize(function() {
        // dbuser.run(`INSERT INTO anime(a_link,a_judul,a_genre,a_season,a_type,a_rating,a_released,a_studio,a_score,a_keyword,a_thumbnail,a_alter,a_sinopsis ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
        //     anime.link, anime.judul, anime.genre, anime.season, anime.type, anime.rating, anime.released, anime.studio, anime.score, anime.keyword, anime.thumbnail, anime.alter, anime.sinopsis
        // ], function(err) {
        //     if (err) {
        //         return console.log(err.message);
        //     }
        // });

        // dbuser.run(`UPDATE anime SET a_judul = ?,a_genre = ?,a_season = ?,a_type = ?,a_rating = ?,a_released = ?,a_studio = ?,a_score = ?,a_keyword = ?,a_thumbnail = ?,a_alter = ?, a_sinopsis = ?, a_status = ? WHERE a_link = ?`, [
        //     anime.judul, anime.genre, anime.season, anime.type, anime.rating, anime.released, anime.studio, anime.score, anime.keyword, anime.thumbnail, anime.alter, anime.sinopsis, anime.status, anime.link
        // ], function(err) {
        //     if (err) {
        //         return console.log(err.message);
        //     }
        // });

//     });
// });

// dbuser.close();


// Step 1 CREATE

// dbuser.serialize(function() {
//     dbuser.run(`CREATE TABLE IF NOT EXISTS anime (
//         a_id INTEGER NOT NULL PRIMARY KEY, 
//         a_link TEXT,
//         a_judul TEXT,
//         a_genre TEXT,
//         a_season TEXT,
//         a_type TEXT,
//         a_rating TEXT,
//         a_released TEXT,
//         a_studio TEXT,
//         a_score TEXT,
//         a_keyword TEXT,
//         a_thumbnail TEXT,
//         a_alter TEXT,
//         a_sinopsis TEXT)`);
// });


// dblogs.serialize(function() {
//     dblogs.run(`CREATE TABLE IF NOT EXISTS episode (
//         e_id INTEGER NOT NULL PRIMARY KEY, 
//         e_animeid TEXT,
//         e_link TEXT,
//         e_media TEXT,
//         e_judul TEXT)`);
// });

// dbuser.serialize(function() {
//     dbuser.run('CREATE TABLE IF NOT EXISTS tele (t_id INTEGER NOT NULL PRIMARY KEY, t_user TEXT NOT NULL, t_from TEXT NOT NULL, t_to TEXT NOT NULL, t_sid TEXT, t_status TEXT, t_date TEXT NOT NULL, t_tname TEXT NOT NULL, t_serv TEXT NOT NULL, t_leng TEXT NOT NULL, t_voice TEXT NOT NULL)');
//     dbuser.run('CREATE TABLE IF NOT EXISTS member (m_id INTEGER NOT NULL PRIMARY KEY, m_user TEXT NOT NULL, m_reg TEXT NOT NULL, m_exp TEXT NOT NULL, m_status TEXT NOT NULL, m_qnow TEXT, m_quote TEXT NOT NULL)');
// });


// Step 2 Insert Dev User
// dbuser.serialize(function() {
//     dbuser.run(`INSERT INTO tele(t_user, t_from, t_to, t_sid, t_status, t_date, t_tname, t_serv, t_leng, t_voice ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
//         'ekaklarasati','2095632858','3093879993','0','0','1644031218574.0','Natalie','App-Service','6','locked'
//     ], function(err) {
//         if (err) {
//             return console.log(err.message);
//         }
//     });

//     dbuser.run(`INSERT INTO member(m_user, m_reg, m_exp, m_status, m_qnow, m_quote ) VALUES(?, ?, ?, ?, ?, ?)`, [
//         'ekaklarasati','1644031218574.0','1646191218574.0','1','0','1000'
//     ], function(err) {
//         if (err) {
//             return console.log(err.message);
//         }
//     });
// })

// OPTIONAL
// dbuser.run(`DELETE FROM tele WHERE t_user = ?`, [
//     'username'
// ], function(err) {
//     if(err){
//         console.log(err)
//     }

// })

// dbuser.close();
// dblogs.close();