var express = require('express');
var ejs = require('ejs');

var app = express();

app.use(express.static(__dirname + '/views/img'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/views/sounds'));
app.use(express.static(__dirname + '/libs'));

app.get('/editor', function(req, res) {
	res.render('editor.ejs', {});
});

app.listen(8080);