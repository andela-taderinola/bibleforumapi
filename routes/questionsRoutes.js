var jwt = require('jsonwebtoken');
var Question = require('../models/questions');
var Answer = require('../models/answers');

module.exports = function (router) {
  router.route('/questions')
    .all(function (request, response, next){
      next();
    })

    .get(function (request, response) {
      Question.find(function (error, question) {
        response.json(question);
      });
    });

   router.route('/questions/:question_id/:id/answers')
   //post answers
   .post(function (request, response) {
      var newAnswer = request.body;
      Answer.create({
        content: newAnswer.content,
        question_id: request.params.question_id,
        author_id: request.params.id
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
      });
   }); 
};