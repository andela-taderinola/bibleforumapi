var mongoose = require('mongoose');

mongoose.connect('mongodb://timiderinola:afriica90@ds031531.mongolab.com:31531/todosdb');

var Schema = mongoose.Schema;

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
