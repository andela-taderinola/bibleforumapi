var mongoose = require('mongoose');
require('../config/db.js');
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
