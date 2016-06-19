var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = mongoose.model('User');

module.exports = function (app, passport) {

  app.use('/', router);


  // console.log(passport);

  router.get('/', function (req, res) {
    res.render('index', {req: req});
  });
  router.get('/login', function (req, res) {
    res.render('login', {
      message: req.flash('loginMessage'),
      signInOut: "Login in",
      name: "danger"
    });
  });

  router.get('/signup', function (req, res) {
    res.render('signup', {
      message: req.flash('signupMessage'),
      signInOut: "Sign up",
      name: "danger"
    });
  });

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect: '/signup',
    failureFlash: true,
    successFlash: true
  }));

  router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true, // allow flash messages
    successFlash: true
  }));
};
