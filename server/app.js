'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID = '923494464895-6s3q60psoh3j9q9r5ao5dpqmcbke6qmh.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'nB_CfRuzG7IQUJs2tkC1o9Ti';

// passport config
passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:3000/auth/google/callback'
		},
		function(accessToken, refreshToken, profile, cb) {
			console.log('HEY');

			return cb(null, profile);
			// db
			// 	.one(`SELECT password from users WHERE password = ${profile.id}`)
			// 	.then(function(err, user) {
			// 		if (user) {
			// 			return cb(err, user);
			// 		} else {
			// 			return cb(null, profile);
			// 		}
			// 	})
			// 	.catch(function(err) {
			// 		return cb(err, 'catch block error');
			// 	});
		}
	)
);

passport.serializeUser(function(user, cb) {
	cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
	cb(null, obj);
});

console.log('testing');
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
		secret: 'some secret value, changeme',
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true }
	})
);

console.log('testing2');
server.use(passport.initialize());
server.use(passport.session());

server.get('/auth/google', passport.authenticate('google', { scope: 'profile' }));
console.log('testing3');

server.get(
	'/auth/google/callback',
	passport.authenticate('google', { failureRedirect: '/login' }),
	function(req, res) {
		// Successful authentication, redirect home.
		res.redirect('/');
	}
);
console.log('testing4');
server.get('/bang/no_auth', (req, res) => {
	res.send('testing');
});

server.get('/profile', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
	res.send('AUTHETICATION SUCCESSFUL');
});

// Serve static assets
server.use(express.static(path.resolve(__dirname, '..', 'build')));

// special handling for request body
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// routes
require('./routes.js')(server);

// react: Always return the main index.html, so react-router render the route in the client
server.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = server;
