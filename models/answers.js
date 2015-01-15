var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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