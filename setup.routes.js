'use strict';
const path = require('path');

const routeFilesPath = './src/routes/';

const normalizedRouteFilesPath = path.join(__dirname, routeFilesPath);

module.exports = function(router) {

    require('fs').readdirSync(normalizedRouteFilesPath).forEach(function (file) {
        var setupRoute = require(routeFilesPath + file);
        setupRoute(router);
    });

}



