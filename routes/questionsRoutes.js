var jwt = require('jsonwebtoken');
var User = require('../models/users');
var Question = require('../models/questions');
var Answer = require('../models/answers');
var ensureAuthorized = require('../auth/ensureAuthorized');

module.exports = function (router) {
  router.route('/questions')
    .all(function (request, response, next){
      next();
    })
  //to view all questions  
    .get(function (request, response) {
      Question.find(function (error, question) {
        if(error){
          response.json(error);
        } else {
          if(!question) {
            response.sendStatus(404);
          } else {
            response.json(question);
          }
        }
      });
    });

  router.route('/questions/:user_id')
  //get all questions by a user
    .get(ensureAuthorized, function (request, response) {
      Question.find({author_id: request.params.user_id}, function (error, question) {
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
        author_id: request.params.user_id
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

    router.route('/questions/:question_id')
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
};