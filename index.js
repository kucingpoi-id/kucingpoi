var app = require('./app');
var config = require('./config');
var http = require('http');

/**
 * Côté serveur web HTTP lançant la partie EXPRESS
 */
var server = http.createServer(app);
server.listen(80,'0.0.0.0');