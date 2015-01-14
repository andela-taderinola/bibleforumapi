var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var usersSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  joined: {
    type: Date,
    default: Date.now
  }  
});

module.exports = mongoose.model('User', usersSchema);
