var Boom    = require('boom'),                                 // HTTP Errors
    Tenant   = require('../models/tenant').Tenant, // Mongoose ODM
    Common = require('./common')
/** @module Controller for Tenant */

/** get all tenants */
exports.GetAll = function (request, reply) {
          Tenant.find({}, function (err, tenants) {
                if (!err) {
                    reply(tenants);
                } else {
                    reply(Boom.badImplementation(err)); // 500 error
                }
            });
        };

/** create new tenant */
exports.Create = function (request, reply) {
          var tenant = new Tenant(request.payload);
          tenant.save(function (err,tenant) {
                if (!err) {
                    reply(tenant).created('/tenants/' + tenant._id);    // HTTP 201
                } else {
                    reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                }
          });
        };

/** get one tenant */
exports.GetTenant = function (request, reply) {
          Tenant.findOne({'_id':request.params.id}, function (err, tenant) {
                if (!err && tenant) {
                    reply(tenant);
                } else if (err) {
                    // Log it, but don't show the user, don't want to expose ourselves (think security)
                    console.log(err);
                    reply(Boom.notFound());
                } else {

                    reply(Boom.notFound());
                }
            });
        };

/** Update Existing tenant */
exports.UpdateTenant = function(request, reply) {
   Tenant.findById(request.params.id, function(err, tenant) {
         if (err) {
            // Log it, but don't show the user, don't want to expose ourselves (think security)
            reply(Boom.notFound());
        } else {
            Common.updateHelper(request.payload, tenant);
            tenant.save(function(err, data) {
                if (!err) {
                    reply(data).created('/tenants/' + data._id); // HTTP 201
                } else {
                    reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                }
            });
        }
   });
};

/** delete one tenant */
exports.DeleteTenant = function (request, reply) {
            Tenant.findOne({'_id':request.params.id}, function(err, tenant) {
                if(!err && tenant) {
                    tenant.remove();
                    reply({ message: "Tenant deleted successfully"});
                } else if(!err) {
                    // Couldn't find the object.
                    reply(Boom.notFound());
                } else {
                    console.log(err);
                    reply(Boom.badRequest("Could not delete Tenant"));
                }
            });
        };

/** search query for teannt */
exports.SearchTenant = function(request, reply) {
    
    var query = {};
    
    if (request.payload.name) query['name'] = new RegExp(request.payload.name, "i");
    if (request.payload.description) query['description'] = new RegExp(request.payload.description, "i");

    Tenant
        .find(query)
        .sort('name')
        .exec(function(err, tenant) {
        if (!err && tenant) {
            reply(tenant);
        } else if (err) {
            // Log it, but don't show the user, don't want to expose ourselves (think security)
            console.log(err);
            reply(Boom.notFound());
        } else {

            reply(Boom.notFound());
        }
    });
};

/** get one tenant exist based on name*/
exports.GetOne = function(request, reply) {
    Tenant.findOne({'name':request.params.id}, function(err, tenant) {
        if (!err) {
            var obj = {};
            if(tenant) {
                obj['_id'] = tenant._id;
                obj['exist'] = 'true';
            }
            else obj['exist'] = 'false';
            reply(obj);
        } else {
            reply(Boom.badImplementation(err)); // 500 error
        }
    });
};
/**
 * Formats an error message that is returned from Mongoose.
 *
 * @param err The error object
 * @returns {string} The error message string.
 */
function getErrorMessageFrom(err) {
    var errorMessage = '';

    if (err.errors) {
        for (var prop in err.errors) {
            if(err.errors.hasOwnProperty(prop)) {
                errorMessage += err.errors[prop].message + ' '
            }
        }

    } else {
        errorMessage = err.message;
    }

    return errorMessage;
}
