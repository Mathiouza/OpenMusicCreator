var express = require('express');
var ejs = require('ejs');

var app = express();

//Gère le dossier img
app.use(express.static(__dirname + '/img'));

app.get('/editor', function(req, res) {
	res.render('app.ejs', {});
});

app.listen(8080);