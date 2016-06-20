var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Poll = mongoose.model('Poll');
var User = mongoose.model('User');
var isLoggedIn = require('../middleware/isAuthenticated');

module.exports = function (app, passport) {

  app.use('/profile', router);


  router.get('/', isLoggedIn, function (req, res) {
    console.log("your email is " + req.session.email);
    res.render('profile', {
      message: req.flash('loginMessage'),
      name: "success"
    });
  });

  // router.get('/finduser', function (req, res) {
  //   console.log();
  // });


  router.get('/created-polls', function (req, res, next) {
    Poll.find({})
    .populate('createdBy')
    .exec(function (err, result) {
      // console.log(result);
      if (err) return res.json({message: "Error"});
      res.json(result);
    });
  });

  router.get('/polls/test', function (req, res, next) {
    Poll.find({})
    .populate('createdBy')
    .exec(function (err, result) {
      // console.log(result);
      if (err) return res.json({message: "Error"});
      res.json(result.name);
    });
  });

  // router.get('/polls', function (req, res, next) {
  //   res.render('link-url');
  // });

  router.post('/polls', function (req, res, next) {
    console.log("Created polls");



    // User.findOne({'local.name': "Ahmed"}, function (err, result) {
    console.log("Getting the user");

    new Promise(function(resolve, reject) {
      var _id;
      User.findOne({'local.email': req.session.email}, function (err, result) {
        if (err) throw err;
        var _id = result._id;
        resolve(_id);
      });
    })

    .then((_id) => {

      // console.log(_id);

      var newPoll = new Poll({
        pollName: req.body.pollName,
        options: req.body.options,
        createdBy: _id
      });

      // console.log(newPoll);

      newPoll.save(function (err) {
        console.log("Saving the result");
        if (err)
        throw err;
      });
    });
  });
};
