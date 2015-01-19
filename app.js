//Required modules
var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var router = express.Router();
var app = express();
app.use(cors());
var routes = require('./routes');
var mongoose = require('mongoose');

mongoose.connect('mongodb://timilehin:timilehin@ds031751.mongolab.com:31751/bibleforum');
// mongoose.connect('mongodb://localhost/biblefeeds');

// Cross domain allow access
var allowCrossDomain = function(request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  if('OPTIONS' == request.method) {
    response.sendStatus(200);
  } else {
      next();
  }
};

app.use(allowCrossDomain);

app.set('port', (process.env.PORT || 5000));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
app.use('/', router);
routes(router);

//listen on port 5000
app.listen(app.get('port'), function() {
  console.log("Listening on port 5000");
});