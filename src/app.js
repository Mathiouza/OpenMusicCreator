var express = require('express');
var ejs = require('ejs');

var app = express();

app.use(express.static(__dirname + '/views/img'));
app.use(express.static(__dirname + '/views'));

app.get('/editor', function(req, res) {
	res.render('app.ejs', {});
});

app.listen(8080);