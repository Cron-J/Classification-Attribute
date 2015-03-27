var Boom = require('boom'),
    Classification = require('../models/classification').Classification,
    Common = require('./common'); 

/** @module Controller for Classification */

/** get all Classification details */
exports.GetAll = function(request, reply) {
  Classification.find({}, function(err, attribute) {
        if (!err) {
            reply(attribute);
        } else {
            reply(Boom.badImplementation(err)); // 500 error
        }
    });
};

/** create new Classification*/
exports.Create = function(request, reply) {
    var classification = new Classification(request.payload);
    classification.save(function(err, classification) {
        if (!err) {
            reply(classification).created('/Classification/' + classification._id); // HTTP 201
        } else {
             if (11000 === err.code || 11001 === err.code) {
                    reply(Boom.forbidden("please provide another classification id, it already exist"));
            }
            else 
            reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
        }
    });
};

/** get one Classification by id */
exports.GetClassification = function(request, reply) {
    Classification.findOne({
        '_id': request.params.id
    }).populate('tenantRef')
    .exec(function(err, classification) {
        if (!err && classification) {
            reply(classification);
        } else if (err) {
            // Log it, but don't show the user, don't want to expose ourselves (think security)
            console.log(err);
            reply(Boom.notFound());
        } else {

            reply(Boom.notFound());
        }
    });
};
/** Update Existing Classification */
exports.UpdateClassification = function(request, reply) {
   Classification.findById(request.params.id , function(err, classification) {
         if (err) {
            // Log it, but don't show the user, don't want to expose ourselves (think security)
            reply(Boom.notFound());
        } else {
            Common.updateHelper(request.payload, classification);
            classification.save(function(err, data) {
                if (!err) {
                    reply(data).created('/classification/' + data._id); // HTTP 201
                } else {
                    reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                }
            });
        }
   });
};

/**delete one Classification by id */
exports.DeleteClassification = function(request, reply) {
    Classification.findOne({
        '_id': request.params.id
    }, function(err, classification) {
        if (!err && classification) {
            classification.remove();
            reply({
                message: "classification deleted successfully"
            });
        } else if (!err) {
            // Couldn't find the object.
            reply(Boom.notFound());
        } else {
            console.log(err);
            reply(Boom.badRequest("Could not delete classification"));
        }
    });
};
/** search classification by query*/
exports.SearchClassification = function(request, reply) {
    var obj = {}; obj1 = {};
    var array = request.payload;
    for( var index=0; index<array.length; index++ ){
        var key = array[index].key;
        var value = array[index].value;
        value = new RegExp(value, "i");
        if(key == "descShort") key = "descriptions.descShort.description";
        if(key == "descLong") key = "descriptions.descLong.description";
        if(key == 'tenantRef') obj1['name'] = value;
        else obj[key] = value;
    }
    Classification.find(obj)
    .populate('tenantRef', null, obj1)
    .sort('classificationId')
    .exec(function(err, classification) {
        if (!err && classification) {
            if(obj1.name){
                var classification1 = [];
                for(var i=0; i<classification.length; i++)
                    if(classification[i].tenantRef !== null) classification1.push(classification[i]);
                reply(classification1);
            }
            else reply(classification);
        } else if (err) reply(Boom.notFound());
     else reply(Boom.notFound());
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