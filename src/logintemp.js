var express = require('express');
var ejs = require('ejs');

var app = express();

//Gère le dossier img
app.use(express.static(__dirname + '/img'));
//Gère le dossier pour CSS
app.use(express.static(__dirname + '/views'));

//Index/Login
app.get('/', function(req, res) {
	res.render('login.ejs');
});

//Gère les 404
app.use(function(req, res, next) {
	console.log('Connexion 404...');
	res.redirect('/');
});

//Démarrage serveur
app.listen(8080);