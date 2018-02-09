var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var fs = require('fs');
//var bddjson = require('./json/compte.json');

var app = express();

//Gère le dossier img
app.use(express.static(__dirname + '/img'));
//Gère le dossier pour CSS
app.use(express.static(__dirname + '/views'));

//Récupere la method POST
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Index/Login
app.get('/', function(req, res) {
	res.render('login.ejs');
});

//Gère la connexion
app.post('/login', function(req, res) {

	//Ouvre la bdd en json
	var bddjsontemp = fs.readFileSync('./json/compte.json');
	var bddjson = JSON.parse(bddjsontemp);

	var quentin = 0;

	var user = req.body.username;
	var mdp = req.body.password;
	
	for(var i = 0; i < bddjson.table.length; i++) {
		if(bddjson.table[i].user == user) {
			if(bddjson.table[i].pass == mdp) {
				i = bddjson.table[i].length;
				console.log('OK !');
				quentin = 1;
			}
		}
	}
	if(quentin == 0) {
		res.redirect('/');
	}
	if(quentin == 1) {
		res.redirect('/');
	}

});

//Gère l'enregistrement dans la bdd json
app.post('/signin', function(req, res) {

	//Ouvre la bdd en json
	var bddjsontemp = fs.readFileSync('./json/compte.json');
	var bddjson = JSON.parse(bddjsontemp);

	var clement = 0;

	var user = req.body.usernamesign;
	var mdp = req.body.passwordsign;
	var mdpVerif = req.body.passwordagain;

	for(var i = 0; i < bddjson.table.length; i++) {
		if(bddjson.table[i].user == user) {
			console.log('Username already taken');
			clement = 1;
		}
	}

	if(clement == 0) {
		//Ajout a la bdd
		fs.readFile('./json/compte.json', 'utf8', function(err, data){
		    if (err){
		        console.log(err);
		    } else {
		    obj = JSON.parse(data);
		    obj.table.push({ "uid": bddjson.table.length, "user": user, "pass": mdp });
		    json = JSON.stringify(obj);
		    fs.writeFile('./json/compte.json', json, 'utf8', function(err){
		    	if(err) {
		    		console.log(err);
		    	}
		    }); 
		}});
		res.redirect('/');
	}
	if(clement == 1) {
		res.redirect('/');
	}

});

//Gère les 404
app.use(function(req, res, next) {
	console.log('Connexion 404...');
	res.redirect('/');
});

//Démarrage serveur
app.listen(8080);