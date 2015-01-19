var jwt = require('jsonwebtoken');
var User = require('../models/answers');
var Question = require('../models/answers');
var Answer = require('../models/answers');
var ensureAuthorized = require('../auth/ensureAuthorized');

module.exports = function (router) {

  router.route('/api/answers/:answer_id')
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
          response.sendStatus(200);
        }
      });
    });
};