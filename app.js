//plugins para sublime -- emmet -- prettty json


//  Importo el mini-framework express
var express = require('express');
// Importo hbs para usar javascript en la vista, motor de templates
var hbs = require('hbs');
// Importo paquete para el manejo de https
var https = require('https');

// Instanciamos una variable donde vamos a usar el framewrok express
var app = express();

/* Set template engine */
app.set('view engine', 'html');
app.engine('html', hbs.__express);

/* Assets */
// Para usar archivos que estan en una carpeta que se llama public 
app.use(express.static('public'));


/* Routes */
// Cuando se haga una petición GET se va a ejecutar una función anónima(Asincrona) que devuelve un hola mundo
app.get('/', function(req, res) {
	//res.send('Hello World!');
	res.render('index'); // pedimos que renderice a el index.html
});

app.get('/search', function(req, res) {
	var endPointSpotify = "https://api.spotify.com/v1/search"+"?q="+req.query.q+"&type=track&limit=10";
	// capturamos lo que llega en el Json
	var buffer = "";

	https.get(endPointSpotify, function(response) {
		
		response.on('data', function(d){
			buffer =+ d;
		});

		response.on('end', function(err) {

			if(req.query.q != undefined && req.query.q !="" ){
		    			res.render('index', {items: JSON.parse(buffer).tracks.items});
			}else{
 				res.render('index');
			}

		});
	});

});

//Asignamos un puerto para escuchar
app.listen(3000, function(){
	console.log('Node Server Runing');
});
