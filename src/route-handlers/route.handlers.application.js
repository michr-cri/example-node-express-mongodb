var mongoose   = require('mongoose');
var Application = require('../models/model.application');

module.exports.getAllApplications = function(req, res) {
    Application.find(function(err, application) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(application);
    });
};

module.exports.saveApplications = function(req, res) {
    var application = new Application(req.body);

    // save the bear and check for errors
    application.save(function(err) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: 'Application created!' });
    });
};

module.exports.getApplicationById = function(req, res) {
    var appId = req.params.app_id;
    Application.findById(appId, function (err, application) {
        if(err) {
            res.status(500).send(err);
            return;
        }

        if(application) {
            res.json(application);
        } else {
            res.status(404).json({message: 'No application found'});
        }
    });
};

module.exports.updateApplication = function(req, res) {
    var appId = req.params.app_id;
    var newApplication = req.body;

    Application.findByIdAndUpdate(appId, newApplication, {runValidators: true, new: true }, function (err, application) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        if(application) {
            res.json(application);
        } else {
            res.status(404).json({message: 'No application found'});
        }
    });
};

module.exports.deleteApplication = function(req, res) {
    var appId = req.params.app_id;

    Application.findByIdAndRemove(appId, function (err, application) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        if(application) {
            res.json(application);
        } else {
            res.status(404).json({message: 'No application found'});
        }
    });
};

