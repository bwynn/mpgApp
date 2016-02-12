// packages ====================================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var flash = require('flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// configuration ===============================================================
var db = require('./config/db'); // connect to db
var port = process.env.port || 8080; // set port
mongoose.connect(db.database); // connect mongoose to db
require('./config/passport')(passport); // passport for auth

app.set('superSecret', db.secret);

// body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// morgan
app.use(morgan('dev'));

// cookie parser
app.use(cookieParser());

// passport config
app.use(session({secret: 'superSecret'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// set static files location
app.use(express.static(__dirname + '/public'));

// routes ======================================================================
require('./routes/appRoutes')(app, passport);

// server ======================================================================
app.listen(port);

console.log("server up and running on port " + port);

exports = module.exports = app;
