// Example model

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var pollSchema = new Schema({
  pollName: String,
  options: [String],
  createdBy: {
    type: String, ref: 'User'
  }
});


mongoose.model('Poll', pollSchema);
