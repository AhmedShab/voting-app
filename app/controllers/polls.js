var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Poll = mongoose.model('Poll');
var User = mongoose.model('User');
var isLoggedIn = require('../middleware/isAuthenticated');

module.exports = function (app, passport) {

  app.use('/polls', router);


  router.get('/', function (req, res) {
    res.render('link-url');
  });

  router.get('/my-polls', function (req, res) {
    res.render('my-polls');
  });

};
