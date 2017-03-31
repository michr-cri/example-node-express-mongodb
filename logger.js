'use strict';
const winston = require('winston');
const envVariableReader = require('./env.variable.reader');

const logFileDirectory = envVariableReader.logFileDirectory();

const serverLogFile = logFileDirectory + '/server.out';
const expressLogFile = logFileDirectory + '/access.log';

const consoleLogLevel = logFileDirectory?'off':'info';
const fileLogLevel = logFileDirectory?'info':'off';

winston.loggers.add('server',{
        console: {
            level: consoleLogLevel,
            colorize: true,
            label: 'server',
            json: false
        },
        file:{
            filename: serverLogFile,
            handleExceptions: true,
            humanReadableUnhandledException: true,
            label: 'server',
            level: fileLogLevel,
            maxsize:          5242880, //5MB
            maxFiles:         20
        }
    }
);

winston.loggers.add('express',{
        console: {
            level: consoleLogLevel,
            colorize: true,
            label: 'express',
            json: false
        },
        file:{
            filename: expressLogFile,
            handleExceptions: true,
            humanReadableUnhandledException: true,
            label: 'express',
            level: fileLogLevel,
            maxsize:          5242880, //5MB
            maxFiles:         20
        }
    }
);

const serverLogger = winston.loggers.get('server');
serverLogger.exitOnError = false;

const webRequestLogLogger = winston.loggers.get('express');
webRequestLogLogger.exitOnError = false;
webRequestLogLogger.stream = {
    write: function(message, encoding){
        webRequestLogLogger.info(message);
    }
};

module.exports = {
    serverLogger: serverLogger,
    expressLogger: webRequestLogLogger
};


