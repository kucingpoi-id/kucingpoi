module.exports = function(req, res) {
    // sess = req.session;
    // if(sess.email == 'admin') {
        const config        = require('../config');
        const fs = require("fs");

        if(req.headers['x-forwarded-proto'] == 'https'){
            var host = `https://${req.get('host')}`;
        }
        else {
            var host = `http://${req.get('host')}`;
        }


        fs.readFile('views/home.html', 'utf8', (err, test) => {
            
            if (err) {
                fs.readFile('views/404.html', 'utf8', (err, test) => {
                    if (err) {
                        console.error(err)
                        res.header('Content-Type', 'text/html').status(404).send('Error 404');

                    }
                    else res.header('Content-Type', 'text/html').status(404).send(test.replace(/###URL###/g, host ));
                });
            }
            else res.send(test.replace(/###URL###/g, host ));
        });
    // }
    // else if(sess.email !== 'admin') res.redirect('/');
    // else res.header('Content-Type', 'text/html').status(404).send('Error 404');
}