var expect = require('chai').expect;
var sinon = require('sinon');

var applicationRouteHandlers = require('../src/route-handlers/route.handlers.application.js');
var Application = require('../src/models/model.application');

describe('Test routes for model application', function() {
    it('should get all applications', function() {
        sinon.stub(Application, 'find');

        var expectedApplications = [
            {id: 1, name: 'umhr'}, {id:2, name: 'nabu'}
        ];

        Application.find.yields(null, expectedApplications);
        var req = { params: { } };
        var res = {
            json: sinon.stub()
        };

        applicationRouteHandlers.getAllApplications(req, res);

        sinon.assert.calledWith(res.json, expectedApplications);

        Application.find.restore();
    });

    it('should save application', function() {
        var applicationSave = sinon.stub(Application.prototype, 'save');

        var req = { body: {id: 1, name: 'uhmr'} };
        var res = {
            json: sinon.stub()
        };

        applicationRouteHandlers.saveApplications(req, res);

        sinon.assert.called(applicationSave);

        Application.prototype.save.reset();
    });

    it('should get application by id', function() {
        sinon.stub(Application, 'findById');

        var expectedApplication = {id: 1, name: 'umhr'};

        Application.findById.yields(null, expectedApplication);
        var req = { params: {app_id: 1} };
        var res = {
            json: sinon.stub()
        };

        applicationRouteHandlers.getApplicationById(req, res);

        sinon.assert.calledWith(res.json, expectedApplication);

        Application.findById.restore();
    });

    it('should update application by id', function() {
        sinon.stub(Application, 'findByIdAndUpdate');

        var expectedApplication = {id: 1, name: 'nabu'};

        Application.findByIdAndUpdate.yields(null, expectedApplication);
        var req = { params: {app_id:1}, body: {name: 'nabu'} };
        var res = {
            json: sinon.stub()
        };

        applicationRouteHandlers.updateApplication(req, res);

        sinon.assert.calledWith(res.json, expectedApplication);

        Application.findByIdAndUpdate.restore();
    });

    it('should delete application by id', function() {
        sinon.stub(Application, 'findByIdAndRemove');

        var expectedApplication = {id: 1, name: 'nabu'};

        Application.findByIdAndRemove.yields(null, expectedApplication);
        var req = { params: {app_id:1} };
        var res = {
            json: sinon.stub()
        };

        applicationRouteHandlers.deleteApplication(req, res);

        sinon.assert.calledWith(res.json, expectedApplication);

        Application.findByIdAndRemove.restore();
    });
});