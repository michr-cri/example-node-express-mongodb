'use strict';

const PROJECT_NAME = process.env.npm_package_name;
const VARIABLE_PREFIX = PROJECT_NAME.toUpperCase().replace(/-/g, '_')+'_';
const DB_CONNECTION_STRING_VAR_NAME = VARIABLE_PREFIX+'DB_CONNECTION_STRING';
const LOG_FILE_DIR_VAR_NAME = VARIABLE_PREFIX+'LOG_FILE_DIR';

const LOCAL_CONNECTION_STRING = 'mongodb://localhost:27017/' + PROJECT_NAME;
const APPLICATION_PORT_VAR_NAME = VARIABLE_PREFIX+ 'PORT';
module.exports={
    dbConnectionString:function() {
        return process.env[DB_CONNECTION_STRING_VAR_NAME]?process.env[DB_CONNECTION_STRING_VAR_NAME]:LOCAL_CONNECTION_STRING;
    },
    logFileDirectory: function() {
        return process.env[LOG_FILE_DIR_VAR_NAME]?process.env[LOG_FILE_DIR_VAR_NAME]:'';
    },
    applicationPort: function() {
        return process.env[APPLICATION_PORT_VAR_NAME]?process.env[APPLICATION_PORT_VAR_NAME]:8080;
    }
};