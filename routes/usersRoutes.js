var jwt = require('jsonwebtoken');
var User = require('../models/users');
var Question = require('../models/questions');

function ensureAuthorized(request, response, next) {
    var bearerToken;
    var bearerHeader = request.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        request.token = bearerToken;
        next();
    } else {
        response.send(403);
    }
};

module.exports = function (router) {
  router.route('/users')
  .all(function (request, response, next){
    next();
  })

  .get(function (request, response) {
    user.find(function (error, user) {
      response.json(user);
    });
  })

  .post(function (request, response) {
    var newUser = request.body;
    user.findOne({
      username: newUser.username 
    }, function (error, user) {
      if(error) {
        response.json({
          type: false,
          data: "An error occured: " + error
        });
      } else {
        if(user) {
          response.json({
            type: false,
            data: "User already exists!"
          });
        } else {
          var userModel = new User();
          userModel.username = newUser.username;
          userModel.password = newUser.password;
          userModel.firstName = newUser.firstName;
          userModel.lastName = newUser.lastName;
          userModel.save(function (error, user) {
            user.token = jwt.sign(user, process.env.JWT_SECRET);
            user.save(function (error, user1) {
              response.json({
                type: true,
                data: user1,
                token:user1.token
              });
            });
          });
        }
      }
    });
  });

  router.route('/users/:id/questions')
    .post(ensureAuthorized, function (request, response) {
      var newQuestion = request.body;
      Question.create({
        content: newQuestion.content,
        author_id: request.params.id
      });
    });
};