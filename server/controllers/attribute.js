var Boom = require('boom'),
    Attribute = require('../models/attribute').Attribute,
    ClassificationGroup = require('../models/classificationGroup').ClassificationGroup
    Common = require('./common'),
    MeasureList = require('unitofmeasure')(),
    cc = require('currency-codes');
/** @module Controller for Attribute */

/** get all attribute details */
exports.GetAll = function(request, reply) {
    Attribute.find({}, function(err, attribute) {
        if (!err) {
            reply(attribute);
        } else {
            reply(Boom.badImplementation(err)); // 500 error
        }
    });
};

/** get all attribute details */
exports.GetAttributesList = function(request, reply) {

    if (!(request.payload.attributeIds instanceof Array)) {
        request.payload.attributeIds = [request.payload.attributeIds];
    }

    Attribute.find({ attributeId : { $in: request.payload.attributeIds }})
    .populate('sectionRef')
    .exec(function(err, attribute) {
        if (!err) {
            reply(attribute);
        } else {
            reply(Boom.badImplementation(err)); // 500 error
        }
    });
};

/** create new attribute*/
exports.Create = function(request, reply) {
    var attribute = new Attribute(request.payload);
    attribute.save(function(err, attribute) {
        if (!err) {
            reply(attribute).created('/attribute/' + attribute._id); // HTTP 201
        } else {
             if (11000 === err.code || 11001 === err.code) {
                    reply(Boom.forbidden("please provide another attribute id, it already exist"));
            }
            else reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
        }
    });
};

/** get one attribute by id */
exports.GetAttribute = function(request, reply) {
    Attribute
        .findOne({ '_id': request.params.id })
        .populate('sectionRef')
        .exec(function(err, attribute) {
            if (!err && attribute) {
                reply(attribute);
            } else if (err) {
                // Log it, but don't show the user, don't want to expose ourselves (think security)
                console.log(err);
                reply(Boom.notFound());
            } else {

                reply(Boom.notFound());
            }
    });
};

/** Update Existing attribute */
exports.UpdateAttribute = function(request, reply) {
   Attribute.findById(request.params.id , function(err, attribute) {
         if (err) {
            // Log it, but don't show the user, don't want to expose ourselves (think security)
            reply(Boom.notFound());
        } else {
            Common.updateHelper(request.payload, attribute);
            attribute.save(function(err, data) {
                if (!err) {
                    reply(data).created('/attribute/' + data._id); // HTTP 201
                } else {
                    reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                }
            });
        }
   });
};

/**delete one attribute by id */
exports.DeleteAttribute = function(request, reply) {
    ClassificationGroup.find({'classGrp2Attributes.attributeRef': request.params.id}, function(error, results){
         if(error) reply(Boom.notFound());
         else if (results.length > 0) reply(Boom.badRequest("this attribute is assigned in classification group, so can not be deleted."));
         else{
            Attribute.findOne({
                '_id': request.params.id
            }, function(err, attribute) {
                if (!err && attribute) {
                    attribute.remove();
                    reply({
                        message: "attribute deleted successfully."
                    });
                } else if (!err) 
                    reply(Boom.notFound());
                 else reply(Boom.badRequest("could not delete attribute."));
            });
        }
    })
};

/** search query for attribute */
exports.SearchAttribute = function(request, reply) {
    var query = {}, obj1 ={};    

    if (request.payload.sectionRef) obj1['attributeSectionId'] = new RegExp(request.payload.sectionRef, "i");
    if (request.payload.attributeId) query['attributeId'] = new RegExp(request.payload.attributeId, "i");
    if (request.payload.description) query['descriptions.descShort.description'] = new RegExp(request.payload.description, "i");
    if (request.payload.extAttributeId) query['extAttributeId'] = new RegExp(request.payload.extAttributeId, "i");

    Attribute.find(query)
    .populate('sectionRef', null, obj1)
    .sort('attributeId')
    .exec(function(err, attribute) {
        if (!err && attribute) {
            if(obj1.attributeSectionId){
                var attribute1 = [];
                for(var i=0; i<attribute.length; i++)
                    if(attribute[i].sectionRef !== null) attribute1.push(attribute[i]);
                reply(attribute1);
            }
            else reply(attribute);
        } else if (err) reply(Boom.notFound());
        else reply(Boom.notFound());
    });
};

/** get static data*/
exports.getStaticData = function(request, reply) {
    var obj = {};
    obj['measureList'] = MeasureList.getData();
    var array = cc.codes();
    var newArray = [];
    for( var index=0; index<array.length; index++ ){
        var obj1 = {};
        obj1['code'] = array[index];
        newArray.push(obj1);
    }
    obj['currencyCode'] = newArray;
    reply(obj);
}

/** get one attribute details based on attributeId*/
exports.GetOne = function(request, reply) {
    Attribute.findOne({'attributeId':request.params.id}, function(err, attribute) {
        if (!err) {
            var obj = {};
            if(attribute) {
                obj['_id'] = attribute._id;
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
            if (err.errors.hasOwnProperty(prop)) {
                errorMessage += err.errors[prop].message + ' '
            }
        }

    } else {
        errorMessage = err.message;
    }

    return errorMessage;
}
