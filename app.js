//Required modules
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var router = express.Router();
var app = express();
var routes = require('./routes');
require('./config/db.js');

//Cross domain allow access
var allowCrossDomain = function(request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-Width');

  next();
};

app.use(allowCrossDomain);

app.set('port', (process.env.PORT || 5000));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
app.use('/api', router);
routes(router);

//listen on port 5000
app.listen(app.get('port'), function() {
  console.log("Listening on port 5000");
});