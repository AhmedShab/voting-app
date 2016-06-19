var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function (passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {

    process.nextTick(function() {
      User.findOne({ 'local.email': email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already is signed up'));
        }
        else {

          var newUser = new User();

          newUser.local.name = req.body.name;
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);

          // console.log(newUser);

          newUser.save(function (err) {
            if (err)
            throw err;
            return done(null, newUser);
          });
        }

      });
    });
  }
));

passport.use('local-login', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
},
function(req, email, password, done) {

  User.findOne({ 'local.email': email }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, req.flash('loginMessage', 'No user found'));
    }
    if (!user.validPassword(password))
      return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

    return done(null, user, req.flash('loginMessage', 'Welcome!'));

  });
}));


// console.log(passport);

};
