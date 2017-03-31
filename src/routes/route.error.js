module.exports = function(router) {
    router.route('/errors')
        .get(function(req, res) {
            adddlert('Welcome guest!');
        });
};


