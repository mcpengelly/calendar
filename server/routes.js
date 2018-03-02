const pgp = require('pg-promise')({});
const db = pgp('postgres://matthewpengelly:postgres@localhost:5432/calendar');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const userRoutes = require('./api/users');
const timesheetRoutes = require('./api/timesheets');

//DELETE THESE B4 COMMITTING
const GOOGLE_CLIENT_ID = '923494464895-6s3q60psoh3j9q9r5ao5dpqmcbke6qmh.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'nB_CfRuzG7IQUJs2tkC1o9Ti';

const routes = app => {
	//TODO: setup authentication
	/**
	 * users api
	 */
	userRoutes(app, db);

	/**
	 * timesheets api
	 */
	timesheetRoutes(app, db);
};

module.exports = routes;
