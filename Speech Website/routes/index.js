//header:
  //this page redirects links to the correct pug templates
var express = require('express');
var router = express.Router();
var path = require('path');





/* GET home page. */
router.get('/', function (req, res, next) {
  //res.sendFile(path.join(__dirname, '../public/pages/', 'index.html'));
  res.render('index');
});

//this redirects you to the profile page
router.get('/profile', function(req, res, next) {
  res.render('profile');
});

//this redirects you to the practices page
router.get('/practices', function(req, res, next) {
  res.render('practices');
});

//this redirects you to the ballots page
router.get('/ballots', function(req, res, next) {
  res.render('ballots')
});

//this redirects you to the feedback page
router.get('/feedback', function(req, res, next) {
  res.render('feedback')
});



module.exports = router;
