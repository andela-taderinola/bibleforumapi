var jwt = require('jsonwebtoken');
var User = require('../models/users');


module.exports = function(router) {
  router.route('/login')
  .post(function (request, response) {
    loginDetails = request.body;
    User.findOne({
      username: loginDetails.username,
      password: loginDetails.password
    }, function (error, user) {
      if(error) {
        response.json({
          type: false,
          data: "Error occured: " + err
        });
      } else {
        if(user) {
          response.json({
            type: true,
            data: user,
            token: user.token
          });
        } else {
          response.json({
            type: false,
            data: "Incorrect email/password"
          });
        }
      }
    });
  });
};