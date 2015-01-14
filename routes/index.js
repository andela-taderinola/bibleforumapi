'use strict';

var users = require('./usersRoutes');
var questions = require('./questionsRoutes');
var answers = require('./answersRoutes');
var login = require('./loginRoutes');

module.exports = function (router) {
  users(router);
  questions(router);
  answers(router);
  login(router);
};