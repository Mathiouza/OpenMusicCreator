var express = require('express');
var ejs = require('ejs');

var app = express();

app.get('/editor', function(req, res) {
	res.render('app.ejs', {});
});

app.listen(8080);