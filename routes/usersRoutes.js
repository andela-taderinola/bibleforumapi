var jwt = require('jsonwebtoken');
var User = require('../models/users');
var Question = require('../models/questions');
var ensureAuthorized = require('../auth/ensureAuthorized');

module.exports = function (router) {
  router.route('/users')
  .all(function (request, response, next){
    next();
  })

  .get(function (request, response) {
    User.find(function (error, user) {
      response.json(user);
    });
  })

  //create account
  .post(function (request, response) {
    var newUser = request.body;
    User.findOne({
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
            console.log(user.token);
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

  router.route('/users/:user_id')
  //change account details
    .put(ensureAuthorized, function (request, response) {
      updatedUser = request.body;
      User.findByIdAndUpdate(request.params.user_id, {
        username: updatedUser.username,
        password: updatedUser.password,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName
      }, function (error, user) {
        if(error) {
          response.json({
            type: false,
            data: "An error occured: " + error
          });
        } else {
          response.sendStatus(200);
        }
      });
    })

  // delete an account
    .delete(ensureAuthorized, function (request, response) {
      User.findByIdAndRemove(request.params.user_id, function (error, user) {
        if(error) {
          response.json({
            type: false,
            data: "Error occured: " + error
          });
        } else {
          if(!user) {
            response.sendStatus(404);
          } else {
            response.json({
              type: true,
              data: "Account '" + user.username + "' deleted successfully."
          });
          }
        }
      });
    });
};