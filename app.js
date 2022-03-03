const express       = require('express');
const path          = require('path')
const session       = require('express-session');
const bodyParser    = require('body-parser');
const router        = express.Router();


var ropath = (...data) => {
  const routepath   = path.join(__dirname, 'routes/' + data +'.js');
  return routepath
}

var app         = express();

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyParser.json());      


app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.use(express.urlencoded({
    extended: true
}));
 
// TEST
app.get('/home', require( ropath('home') ) );
app.get('/anime', require( ropath('list') ) )
app.get('/anime/:action', require( ropath('anime') ) )
app.get('/cache/:action', require( ropath('action') ) )
app.get('/:action', require( ropath('watch') ) )
app.get('/w/:action', require( ropath('video') ) )
app.get('/list/:action', require( ropath('abjad') ) )


app.get('/',(req,res) => {
  // sess = req.session;
  // if(sess.email == 'admin') {
  //     return res.redirect('/home');
  // }
  res.sendFile(__dirname + '/views/index.html');
});

// app.post('/login',(req,res) => {
//   sess = req.session;
//   if(req.body.email == 'admin' & req.body.pass == '654321'){
//     sess.email = req.body.email;

//     res.end('done');
//   }
//   else {
//     res.end('false');
//   }

// });

// app.get('/logout',(req,res) => {
//   req.session.destroy((err) => {
//       if(err) {
//           return console.log(err);
//       }
//       res.redirect('/');
//   });

// });

app.use(function(req,res) {
  res.header('Content-Type', 'text/html').status(404).send('Error 404');
})
  

module.exports = app;