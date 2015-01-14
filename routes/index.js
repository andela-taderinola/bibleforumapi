'use strict';

var users = require('./usersRoutes');
var questions = require('./questionsRoutes');
var login = require('./loginRoutes');
var logout = require('./logoutRoutes');

module.exports = function (router) {
  users(router);
  questions(router);
  login(router);
  logout(router);
};