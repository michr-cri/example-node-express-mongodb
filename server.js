'use strict';

const loggers = require('./logger');
const serverLogger = loggers.serverLogger;
const expressLogger = loggers.expressLogger;
const envVariableReader = require('./env.variable.reader');

// EXPRESS SERVER CONFIG & SETUP STARTS
const contextPath = '/';
const port = envVariableReader.applicationPort();

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To write http requests to a log file
app.use(require('morgan')('{"remote_addr": ":remote-addr", "remote_user": ":remote-user", "date": ":date[clf]", "method": ":method", "url": ":url", "http_version": ":http-version", "status": ":status", "result_length": ":res[content-length]", "referrer": ":referrer", "user_agent": ":user-agent", "response_time": ":response-time"}', {stream: expressLogger.stream}));

const router = express.Router();

require('./setup.routes')(router);

serverLogger.log('info', 'App routes were imported');

router.use(function(req, res, next) {
    next(); // make sure we go to the next routes and don't stop here
});

app.use(contextPath,router);
serverLogger.info('App routes were set using context path %s', contextPath);
// EXPRESS SERVER CONFIG & SETUP ENDS

// MONGODB RELATED CONFIG STARTS
const mongoose = require('mongoose');

// Mongodb connections are managed by mongoose. Wherever mongoose is required this connection will be effective.
// If you need to consolidate opening/closing of connections for multiple requests to the database manage those connections individually.
const dbConnectionString = envVariableReader.dbConnectionString();
mongoose.connect(dbConnectionString);

serverLogger.log('info', 'Mongoose connection is configured using %s', dbConnectionString);
// MONGODB RELATED CONFIG ENDS

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Please visit https://localhost:'+port+contextPath);


