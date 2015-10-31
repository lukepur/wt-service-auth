var express = require('express');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var winston = require('winston');
var morgan = require('morgan');
var routes = require('./routes');
var errorHandler = require('./middleware/general-error-handler');

var app = express();
var port;
var loadKeys = require('./keys/load-or-generate-keys');

require('dotenv').config();
require('mongoose').connect(process.env.dbUrl);
winston.level = process.env.LOG_LEVEL || 'info';

port = process.env.PORT || 3333;

app.set('secret', process.env.SECRET);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(routes);
app.use(errorHandler);

loadKeys();

app.listen(port, function() {
  winston.info('listening to port %s', port);
});
