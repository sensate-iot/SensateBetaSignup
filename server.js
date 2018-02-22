/*
 * Service entry point.
 * 
 * Author: Michel Megens
 * Email: dev@bietje.net
 */

var express = require('express');
var parser = require('body-parser');
var settings = require('config.json')('./config.json');
var routes_v1 = require('./routes/routes_v1');
const _ = require('./database/connector');

/* Create express */
var app = express();

app.set('dbKey', settings.dbPassword);
app.set('dbUser', settings.dbUser);
app.set('dbServer', settings.dbServer);
app.set('dbDatabase', 'Sensate');
app.set('dbTable', 'Pre_SignUp');
app.set('webPort', settings.webPort);
app.set('webAddress', settings.webAddress);

app.use(parser.urlencoded({extended:true}));
app.use(parser.json());

app.all('*', function(req, res, next) {
	console.log(req.method + " " + req.url);
	next();
});

app.use('/v1', routes_v1);

var port = app.get('webPort');
var server = app.listen(port, function() {
	console.log('Listening on port ' + server.address().address + ':' + server.address().port);
});

module.exports = app;
