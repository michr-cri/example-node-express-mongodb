var applicationRouteHandlers = require('../route-handlers/route.handlers.application.js');

module.exports = function(router) {
    router.route('/applications')
    //create applications
        .post(applicationRouteHandlers.saveApplications)
        //get all applications
        .get(applicationRouteHandlers.getAllApplications);

    router.route('/applications/:app_id')
        .get(applicationRouteHandlers.getApplicationById)
        .put(applicationRouteHandlers.updateApplication)
        .delete(applicationRouteHandlers.deleteApplication);
};
