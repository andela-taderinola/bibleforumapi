var jwt = require('jsonwebtoken');
var User = require('../models/answers');
var Question = require('../models/answers');
var Answer = require('../models/answers');
var ensureAuthorized = require('../auth/ensureAuthorized');

module.exports = function (router) {
  router.route('/api/questions')
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

  router.route('/api/questions/:question_id')  
    //get question by id
    .get(function (request, response) {
      Question.findById(request.params.question_id, (function (error, question) {
        if(error) {
          response.send(error);
        } else {
          if(!question) {
            response.sendStatus(404);
          } else {
            response.json(question);
          }
        }
      }));
    });

  //answers
  router.route('/api/questions/:question_id/answers')
   //post answers
   .post(ensureAuthorized, function (request, response) {
      var newAnswer = request.body;
      Answer.create({
        content: newAnswer.content,
        likes: newAnswer.likes,
        okays: newAnswer.okays,
        dislikes: newAnswer.dislikes,
        question_id: request.params.question_id,
        author: newAnswer.author
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
   })

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

  router.route('/api/questions/:question_id/answers/:answer_id')  
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