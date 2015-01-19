var jwt = require('jsonwebtoken');
var User = require('../models/answers');
var Question = require('../models/answers');
var Answer = require('../models/answers');
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
  });

  router.route('/signup')
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
                username: user1.username,
                token:user1.token
              });
            });
          });
        }
      }
    });
  });

  router.route('/dashboard/:user_id')
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

  router.route('/api/users/:username/questions')
  //get all questions by a user
    .get(ensureAuthorized, function (request, response) {
      Question.find({author: request.params.username}, function (error, question) {
        if(error) {
          response.json(error);
        } else {
          if(!question) {
            response.sendStatus(404);
          } else {
            response.json(question);
          }
        }
      });
    })
  //add questions
    .post(ensureAuthorized, function (request, response) {
      var newQuestion = request.body;
      Question.create({
        content: newQuestion.content,
        author: request.params.username
      }, function (error, question) {
        if(error) {
          response.json({
            type: false,
            data: "An error occured: " + error
          });
        } else {
          response.json({
            type: true,
            data: "Success."
          });
        }
      });
    });

  router.route('/api/users/:username/questions/:question_id')
  //edit question
    .put(ensureAuthorized, function (request, response) {
      var updatedQuestion = request.body;
      Question.findByIdAndUpdate(request.params.question_id, {
        content: updatedQuestion.content,
        edited: true
      }, function (error, question) {
        if(error) {
          response.json({
            type: false,
            data: "Error occured: " + error
          });
        } else {
          response.json({
            type: true,
            data: "Question updated successfully."
          });
        }
      });
    })
  //delete question
    .delete(ensureAuthorized, function (request, response) {
      Question.findByIdAndRemove(request.params.question_id, function (error, question) {
        if(error) {
          response.json({
            type: false,
            data: "Error occured: " + error
          });
        } else {
          if(!question) {
            response.sendStatus(404);
          } else {
            response.sendStatus(200);
          }
        }
      });
    });  

  router.route('/users/:username/answers')
  //get all answers by a user
    .get(ensureAuthorized, function (request, response) {
      Answer.find({author: request.params.username}, function (error, answers) {
        if(error) {
          response.json(error);
        } else {
          if(!answers) {
            response.sendStatus(404);
          } else {
            response.json(answers);
          }
        }
      });
    });
};