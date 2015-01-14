var jwt = require('jsonwebtoken');
var Question = require('../models/questions');

module.exports = function (router) {
  router.route('/questions')
    .all(function (request, response, next){
      next();
    })

    .get(function (request, response) {
      user.find(function (error, question) {
        response.json(question);
      });
    });
};