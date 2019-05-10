//header:
  //this is the main JS page that handles the website
  //it has all the requires, authentication, and the create/read functions
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var dotenv = require('dotenv');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var flash = require('connect-flash');
var mongoose = require("mongoose");
var userInViews = require('./lib/middleware/userInViews');
var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fs = require('fs');



//this is the schema I'm using for each practices
//each practices has a student, coach, date, feedback, category
var speechSchema = mongoose.Schema({
  studID: String,
  coachID: String,
  date: String,
  feedback: String,
  category: String
})

//creates the speech database
var speech = mongoose.model("Speech", speechSchema);

//just some stuff for mongo
var promise = mongoose.connect('mongodb://localhost',{
 useNewUrlParser: false
}, function(err){
	if(err){
		throw err;
	}else{
		console.log("Database connection successful");
	}
});

dotenv.load();
//userId: id
//coachId:

//schema with coachid, studid, feedback
//{

//}
// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);

// You can use this section to keep a smaller payload
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

//all some stuff needed to set up express
const app = express();

//sets up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//this is the create function that adds data to the database
app.post('/create', function(req, res){
  //adds data based off the inputs in all the forms
    //usees the same schema as before
	speech.create({studID:req.body.studID, coachID:req.body.coachID, date:req.body.date, feedback:req.body.feedback, category:req.body.category}, function(err, data){
		if(err){
			throw(err);
		}
	});
  //refreshes back to the page to input feedback
	res.redirect('feedback');
});


//this reads from the database
app.post('/read', function(req, res){

  fs.readFile('test.json',function(err,content){
    if(err) throw err;

    //reads the data from the JSON and stores it in email
    var email = "" + content
    //removes the quotes from each end of the string so that it can query
    email = email.substring(1,email.length-1)

    //creates a query and searches for the data using that email
    var query = { studID : email };
    speech.find(query, function(err, data){

      //for all the data in the query it will go through and add them to arrays
      if (err) throw err;
      var coaches = [];
      var dates = [];
      var feedbacks = [];
      var categories = [];
      for(var i = 0; i < data.length; i++){
          coaches.push(data[i]['coachID']);
          dates.push(data[i]['date']);
          feedbacks.push(data[i]['feedback']);
          categories.push(data[i]['category']);
      }
      //sends data to a new template to display
      res.render('ballots', {coach: coaches, date: dates, feedback: feedbacks, category: categories});

    });

  });

});


// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cookieParser());

// config express-session
var sess = {
  secret: 'CHANGE THIS SECRET',
  cookie: {},
  resave: false,
  saveUninitialized: true
};

if (app.get('env') === 'production') {
  sess.cookie.secure = true; // serve secure cookies, requires https
}

app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());

// Handle auth failure error messages
app.use(function (req, res, next) {
  if (req && req.query && req.query.error) {
    req.flash('error', req.query.error);
  }
  if (req && req.query && req.query.error_description) {
    req.flash('error_description', req.query.error_description);
  }
  next();
});

app.use(userInViews());
app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/', usersRouter);



// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers

// Development error handler
// Will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Production error handler
// No stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




app.use(userInViews());
app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/', usersRouter);

module.exports = app;
