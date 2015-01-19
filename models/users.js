var mongoose = require('mongoose');

mongoose.createConnection('mongodb://timiderinola:afriica90@ds031531.mongolab.com:31531/todosdb');

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
