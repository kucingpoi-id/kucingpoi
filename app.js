// load the things we need
const express       = require('express');
const path          = require('path');
const bodyParser    = require('body-parser');
const app           = express();


app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.use(bodyParser.json());  
app.use(express.urlencoded({
  extended: true
}));

// set the view engine to ejs
app.set('view engine', 'ejs');
// use res.render to load up an ejs view file

function pfilter(params) {
  if(params.match(/([-a-zA-Z0-9])/)) {
    var pftr = params;
  }
  else {
    var pftr = 'block';
  }
  return pftr;
}

// index page
app.get('/', require('./routes/index'));
// app.get('/', function(req, res) {
//   res.render('layouts/index');
// });

// anime list page
app.get('/anime', require('./routes/list'));
app.get('/list', require('./routes/list'));

// anime detail page
app.get('/anime/:action', require('./routes/list'));
// app.get('/anime/:action', require('./routes/detail'));

// watch anime page
app.get('/watch/:action', require('./routes/watch'));

// watch anime page
app.get('/list/:action', function(req, res) {
  if(pfilter(req.params.action) == 'block') {
    res.render('layouts/404');
  }
  else {
    res.render('layouts/abc',{
      paramtitle: req.params.action
    });
  }
});

// genre page
app.get('/genre/:action', function(req, res) {
  if(pfilter(req.params.action) == 'block') {
    res.render('layouts/404');
  }
  else {
    res.render('layouts/genre',{
      paramtitle: req.params.action
    });
  }
});

// season page
app.get('/season/:action', function(req, res) {
  // console.log(pfilter(req.params.action))
  if(pfilter(req.params.action) == 'block') {
    res.render('layouts/404');
  }
  else {
    res.render('layouts/season',{
      paramtitle: req.params.action
    });
  }
});

// popolar page
// app.get('/popular', function(req, res) {
//     res.render('layouts/popular');
// });

// popolar page
app.get('/test', require('./routes/test'));
// app.get('/test/:action', require('./routes/testpage'));

// popolar page
// app.get('/to', require('./routes/index'));


// routes api action
app.get('/cache/:action', require('./modules/action'));

// routes api video
app.get('/w/:action', require('./modules/video'));


app.use(function(req,res) {
  res.header('Content-Type', 'text/html').status(404).render('layouts/404');
})


app.listen(8080);
console.log('8080 is the magic port');

module.exports = app