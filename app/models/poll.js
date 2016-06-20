// Example model

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var pollSchema = new Schema({
  pollName: String,
  options: [String],
  createdBy : { type: Schema.Types.ObjectId, ref: 'User' }
});


mongoose.model('Poll', pollSchema);
