var Boom = require('boom'),
    AttributeSection = require('../models/attributeSection').AttributeSection,
    Attribute = require('../models/attribute').Attribute,
    Common = require('./common'); 

/** @module Controller for Attribute */

/** get all attribute details */
exports.GetAll = function(request, reply) {
  AttributeSection.find({}, function(err, attributeSection) {
        if (!err) {
            reply(attributeSection);
        } else {
            reply(Boom.badImplementation(err)); // 500 error
        }
    });
};

/** create new attribute*/
exports.Create = function(request, reply) {
    var attributeSection = new AttributeSection(request.payload);
    attributeSection.save(function(err, attributeSection) {
        if (!err) {
            reply(attributeSection).created('/attributeSection/' + attributeSection._id); // HTTP 201
        } else {
            if (11000 === err.code || 11001 === err.code) {
                    reply(Boom.forbidden("please provide another attribute section id, it already exist"));
            }
            else reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
        }
    });
};

/** get one attributeSection by id */
exports.GetAttributeSection = function(request, reply) {
    AttributeSection.findOne({'_id': request.params.id}, function(err, attributeSection) {
        if (!err && attributeSection) {
            reply(attributeSection);
        } else if (err) {
            // Log it, but don't show the user, don't want to expose ourselves (think security)
            console.log(err);
            reply(Boom.notFound());
        } else {

            reply(Boom.notFound());
        }
    });
};

/** Update Existing attribute section*/
exports.UpdateAttributeSection = function(request, reply) {
   AttributeSection.findById(request.params.id , function(err, attributeSection) {
         if (err) {
            // Log it, but don't show the user, don't want to expose ourselves (think security)
            reply(Boom.notFound());
        } else {
            Common.updateHelper(request.payload, attributeSection);
            attributeSection.save(function(err, data) {
                if (!err) {
                    reply(data).created('/attributeSection/' + data._id); // HTTP 201
                } else {
                    reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                }
            });
        }
   });
};

/**delete one attribute section by id */
exports.DeleteAttributeSection = function(request, reply) {
    Attribute.find({'sectionRef': request.params.id}, function(error, results){
        if(error){
            console.log(error);
            reply(Boom.notFound());
        }
        else if(results.length > 0) reply(Boom.badRequest("this attribute section is assigned in attribute, so can not be deleted."));
        else{
            AttributeSection.findOne({'_id': request.params.id}, function(err, attributeSection) {
                if (!err && attributeSection) {
                    attributeSection.remove();
                    reply({
                        message: "Attribute section deleted successfully"
                    });
                } else if (!err) reply(Boom.notFound());
                else reply(Boom.badRequest("Could not delete Attribute section"));
            });
        }
    })
};

/** search query for attributeSection */
exports.SearchAttributeSection = function(request, reply) {
    var query = {};
    
    if (request.payload.attributeSectionId) query['attributeSectionId'] = new RegExp(request.payload.attributeSectionId, "i");
    if (request.payload.description) query['descriptions.description'] = new RegExp(request.payload.description, "i");
    if (request.payload.name) query['names.name'] = new RegExp(request.payload.name, "i");

    AttributeSection
    .find(query)
    .sort('attributeSectionId')
    .exec(function(err, attributeSection) {
        if (!err && attributeSection) {
            reply(attributeSection);
        } else if (err) {
            // Log it, but don't show the user, don't want to expose ourselves (think security)
            console.log(err);
            reply(Boom.notFound());
        } else {

            reply(Boom.notFound());
        }
    });
};

/** get one attributeSection details based on attributeId*/
exports.GetOne = function(request, reply) {
    AttributeSection.findOne({'attributeSectionId':request.params.id}, function(err, attributeSection) {
        if (!err) {
            var obj = {};
            if(attributeSection){
                obj['exist'] = 'true';
                obj['_id'] = attributeSection._id;
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
            if (err.errors.hasOwnProperty(prop)) {
                errorMessage += err.errors[prop].message + ' '
            }
        }
    } else {
        errorMessage = err.message;
    }
    return errorMessage;
}