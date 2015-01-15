var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionsSchema = new Schema({
  content: String,
  author_id: Schema.Types.ObjectId,
  posted: {
    type: Date,
    default: Date.now
  },
  answers: {type: Number, default: 0},
  edited: {type: Boolean, default: false}  
});

module.exports = mongoose.model('Question', questionsSchema);
