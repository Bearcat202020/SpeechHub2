//header:
  //this is the main JS page that handles the log in
  //it handles the post that writes user emails into JSON
var express = require('express');
var secured = require('../lib/middleware/secured');
var router = express.Router();
var jsonfile = require('fs');


/* GET user profile. */
router.get('/user', secured(), function (req, res, next) {
  //when you log it it grabs your user data
  const { _raw, _json, ...userProfile } = req.user;

  //it writes your email to a JSON file 'JSON.test'
  var email = JSON.stringify(userProfile.emails[0].value);
  JSON.stringify(email);
  jsonfile.writeFile('test.json', email, 'utf8', next);

  //this renders the profile page and send the data like your picture and name to it
  res.render('profile', {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: 'Profile page'

  });
});

module.exports = router;
