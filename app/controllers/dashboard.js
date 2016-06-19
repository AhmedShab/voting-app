var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Poll = mongoose.model('Poll');
var isLoggedIn = require('../middleware/isAuthenticated');

module.exports = function (app, passport) {

app.use('/profile', router);

  // console.log(passport);

  router.get('/', function (req, res) {
    res.render('profile', {
      message: req.flash('loginMessage'),
      name: "success"
    });
  });


router.get('/polls', function (req, res, next) {
  Poll.findOne({pollName: "FF7"})
    .populate('createdBy')
    .exec(function (err, result) {
      if (err) return res.json({message: "Error"});
      res.json(result);
    });
});

router.get('/polls/test', function (req, res, next) {
  Poll.findOne({pollName: "FF7"})
    .populate('createdBy')
    .exec(function (err, result) {
      // console.log(result);
      if (err) return res.json({message: "Error"});
      res.json(result);
    });
});

  router.post('/polls', function (req, res, next) {
    var newPoll = new Poll({
      pollName: req.body.pollName,
      options: req.body.options,
      "createdBy" : "Ahmed"
    });

    // console.log(newPoll);

    newPoll.save(function (err) {
      if (err)
        throw err;
      res.render('/polls');

    });
  });
};
