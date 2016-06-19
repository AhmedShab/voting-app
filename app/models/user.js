// Example model

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt   = require('bcrypt-nodejs');

var userSchema = new Schema({
  local :{
    name: String,
    email: String,
    password: String,
    polls: [{ type: Schema.Types.ObjectId, ref: 'Polls' }]
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


mongoose.model('User', userSchema);
