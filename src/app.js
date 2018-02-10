var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

//Gère les dossiers
app.use(express.static(__dirname + '/views/img'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/views/sounds'));
app.use(express.static(__dirname + '/libs'));
app.use(express.static(__dirname + '/views/music'));

//Récupere la method POST
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Index/Login
app.get('/', function(req, res) {
	res.render('login.ejs');
});

//Page editor
app.get('/editor', function(req, res) {
	res.render('editor.ejs', {});
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
				quentin = 1;
			}
		}
	}
	if(quentin == 0) {
		console.log('Connexion refusé !');
		res.redirect('/');
	}
	if(quentin == 1) {
		console.log('Connexion autorisé !');
		res.redirect('/editor');
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
		console.log('Création de compte autorisé !');
		res.redirect('/');
	}
	if(clement == 1) {
		console.log('Création de compte refusé !');
		res.redirect('/');
	}

});

//Gère les 404
app.use(function(req, res, next) {
	console.log('Connexion 404...');
	res.redirect('/');
});

//Ecoute le port 8080
app.listen(8080);