var Boom    = require('boom'),                                 // HTTP Errors
    Status   = require('../models/status').Status, // Mongoose ODM
    Common = require('./common')
/** @module Controller for status */

/** get all status */
exports.GetAll = function (request, reply) {
          Status.find({}, function (err, status) {
                if (!err) {
                    reply(status);
                } else {
                    reply(Boom.badImplementation(err)); // 500 error
                }
            });
        };

/** create new status */
exports.Create = function (request, reply) {
          var status = new Status(request.payload);
          status.save(function (err,status) {
                if (!err) {
                    reply(status).created('/status/' + status._id);    // HTTP 201
                } else {
                    reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                }
          });
        };

/** get one status */
exports.Get = function (request, reply) {
          Status.findOne({'_id':request.params.id}, function (err, status) {
                if (!err && status) {
                    reply(status);
                } else if (err) {
                    // Log it, but don't show the user, don't want to expose ourselves (think security)
                    console.log(err);
                    reply(Boom.notFound());
                } else {

                    reply(Boom.notFound());
                }
            });
        };

/** Update Existing status */
exports.Update = function(request, reply) {
   Status.findById(request.params.id, function(err, status) {
         if (err) {
            // Log it, but don't show the user, don't want to expose ourselves (think security)
            reply(Boom.notFound());
        } else {
            Common.updateHelper(request.payload, status);
            status.save(function(err, data) {
                if (!err) {
                    reply(data).created('/status/' + data._id); // HTTP 201
                } else {
                    reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                }
            });
        }
   });
};

/** delete one status */
exports.Delete = function (request, reply) {
    Status.findOne({'_id':request.params.id}, function(err, status) {
        if(!err && status) {
            status.remove();
            reply({ message: "status deleted successfully"});
        } else if(!err) {
            // Couldn't find the object.
            reply(Boom.notFound());
        } else {
            console.log(err);
            reply(Boom.badRequest("Could not delete status"));
        }
    });
};
