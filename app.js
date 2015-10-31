var express = require('express');
var routes = require('./routes');
var app = express();
var hbs = require('hbs');
var port;
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var winston = require('winston');
var morgan = require('morgan');
var loadKeys = require('./keys/load-or-generate-keys');

require('dotenv').config();
require('mongoose').connect(process.env.dbUrl);
winston.level = process.env.LOG_LEVEL || 'info';

port = process.env.PORT || 3333;
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.set('secret', process.env.SECRET);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(routes);

app.use(express.static('build'));

app.listen(port, function() {
  winston.info('listening to port %s', port);
});

loadKeys();
