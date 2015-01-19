var mongoose = require('mongoose');

mongoose.createConnection('mongodb://timilehin:timilehin@ds031751.mongolab.com:31751/bibleforum');

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