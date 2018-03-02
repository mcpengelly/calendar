'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const Strategy = require('passport-facebook').Strategy;
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

const CLIENT_ID = '410136516078481';
const CLIENT_SECRET = '692c36e39178cdc298eda3a8e79bac45';
// const GOOGLE_CLIENT_ID = '923494464895-6s3q60psoh3j9q9r5ao5dpqmcbke6qmh.apps.googleusercontent.com';
// const GOOGLE_CLIENT_SECRET = 'nB_CfRuzG7IQUJs2tkC1o9Ti';

// passport config
passport.use(
  new Strategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/login/facebook/return',
      profileFields: [
        'id',
        'displayName',
        'email',
        'birthday',
        'friends',
        'first_name',
        'last_name',
        'middle_name',
        'gender',
        'link'
      ]
    },
    function(accessToken, refreshToken, profile, cb) {
      // In this example, the user's Facebook profile is supplied as the user
      // record.  In a production-quality application, the Facebook profile should
      // be associated with a user record in the application's database, which
      // allows for account linking and authentication with other identity
      // providers.
      console.log('profile:', profile);
      return cb(null, profile);
    }
  )
);


passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const server = express();

// Logger Setup
server.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version"' +
      ':status :res[content-length] :response-time ms'
  )
);

server.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  })
);

server.use(passport.initialize());
server.use(passport.session());

server.get('/login/facebook', passport.authenticate('facebook'));

server.get(
  '/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login_failure' }),
  function(req, res) {
    res.redirect('/');
  }
);

server.get('/login', passport.authenticate('facebook'), (req, res) => {
  res.redirect('/profile');
});

server.get('/profile', passport.authenticate('facebook'), (req, res) => {
  res.send('some data');
});

// Serve static assets
server.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));

// special handling for request body
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// routes
// require('./routes.js')(server);

// react: Always return the main index.html, so react-server router the route in the client
server.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = server;
