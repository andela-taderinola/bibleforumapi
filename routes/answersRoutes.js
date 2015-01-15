var jwt = require('jsonwebtoken');
var User = require('../models/users');
var Question = require('../models/questions');
var Answer = require('../models/answers');
var ensureAuthorized = require('../auth/ensureAuthorized');

module.exports = function (router) {
  router.route('/answers/:question_id/:user_id')
   //post answers
   .post(ensureAuthorized, function (request, response) {
      var newAnswer = request.body;
      Answer.create({
        content: newAnswer.content,
        question_id: request.params.question_id,
        author_id: request.params.user_id
      }, function (error, answer) {
        if(error) {
          response.json({
            type: false,
            data: "An error occured: " + error
          });
        } else {
          response.json({
            type: true,
            data: "Answer sent."
          });
        }
        Question.findByIdAndUpdate(request.params.question_id, {
          $inc: {answers: 1}
        }, function (error, question) {
        });
      });
   }); 

  router.route('api/questions/:question_id/answers')
  //get all answers to a question
  .get(function (request, response) {
    Answer.find({question_id: request.params.question_id}, function (error, answer) {
      if(error){
        response.json({
          type: false,
          data: "Error occured: " + error
        });
      } else {
        response.json(answer);
      }
    });
  });

  router.route('/users/:user_id/answers')
  //get all answers by a user
    .get(ensureAuthorized, function (request, response) {
      request.send("Error.");
      Answer.find({author_id: request.params.user_id}, function (error, answers) {
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

  router.route('/answers/:answer_id')
  //add review or update answer
    .put(function (request, response) {
      var updatedAnswer = request.body;
      Answer.findByIdAndUpdate(request.params.answer_id, {
        edited: updatedAnswer.content !== Answer.content,
        content: updatedAnswer.content,
        likes: updatedAnswer.likes,
        okays: updatedAnswer.okays,
        dislikes: updatedAnswer.dislikes
      }, function (error, answer) {
        if(error) {
          response.json({
            type: false,
            data: "Error occured: " + error
          });
        } else {
          response.send(200);
        }
      });
    });

  router.route('/answers/:question_id/:answer_id')  
  //delete answer
    .delete(ensureAuthorized, function (request, response) {
      Answer.findByIdAndRemove(request.params.answer_id, function (error, answer) {
        if(error) {
          response.json({
            type: false,
            data: "Error occured: " + error
          });
        } else {
          if(!answer) {
            response.sendStatus(404);
          } else {
            response.sendStatus(200);
          }
        }
        Question.findByIdAndUpdate(request.params.question_id, {
          $inc: {answers: -1}
        }, function (error, question) {
        });
      });
    });
};