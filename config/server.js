//imports: express, consign, body-parser, express-validator
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

//init express object
var app = express();

//set view engines and views on express
app.set('view engine', 'ejs');
app.set('views', './app/views');

//middlewares config
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator()); 

//autoload routes, models and controllers to app obj

consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

//exports obj app
module.exports = app;