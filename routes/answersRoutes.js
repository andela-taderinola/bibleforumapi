var jwt = require('jsonwebtoken');
var Question = require('../models/questions');
var Answer = require('../models/answers');

module.exports = function (router) {
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
    })

  //delete answer
    .delete(function (request, response) {
      Answer.findByIdAndRemove(request.params.answer_id, function (error, answer) {
        if(error) {
          response.json({
            type: false,
            data: "Error occured: " + error
          });
        } else {
          if(!answer) {
            response.send(404);
          } else {
            response.send(200);
          }
        }
      });
    });
};