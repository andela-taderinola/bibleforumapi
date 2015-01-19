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

var questionsSchema = new Schema({
  content: String,
  author: String,
  posted: {
    type: Date,
    default: Date.now
  },
  answers: {type: Number, default: 0},
  edited: {type: Boolean, default: false}  
});

module.exports = mongoose.model('Question', questionsSchema);

var answersSchema = new Schema({
  content: String,
  author: String,
  question_id: Schema.Types.ObjectId,
  likes: {type: Number, default: 0},
  okays: {type: Number, default: 0},
  dislikes: {type: Number, default: 0},
  edited: {type: Boolean, default: false},
  posted: {
    type: Date,
    default: Date.now
  }  
});

module.exports = mongoose.model('Answer', answersSchema);