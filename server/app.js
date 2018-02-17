'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const server = express();

// Logger Setup
server.use(
	morgan(
		':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version"' +
			':status :res[content-length] :response-time ms'
	)
);

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
