var Boom = require('boom'),
    ClassificationGroup = require('../models/classificationGroup').ClassificationGroup,
    Attribute = require('../models/attribute').Attribute
    Common = require('./common');

/** @module Controller for ClassificationGroup */

/** get all ClassificationGroup details */
exports.GetAll = function(request, reply) {
  ClassificationGroup.find({}, function(err, attribute) {
        if (!err) {
            reply(attribute);
        } else {
            reply(Boom.badImplementation(err)); // 500 error
        }
    });
};

/** create new ClassificationGroup*/
exports.Create = function(request, reply) {
    var classificationGroup = new ClassificationGroup(request.payload);
    if(classificationGroup.classGrp2Attributes.attributeRef != undefined) 
        classificationGroup.classGrp2Attributes.attributeRef = classificationGroup.classGrp2Attributes.attributeRef._id;
    ClassificationGroup.find({'_id':classificationGroup.parentClassificationGrpRef})
        .populate('parentClassificationGrpRef')
        .exec(function(err, attribute) {
            if (!err) {
                if(attribute.parentClassificationGrpRef === undefined){
                    classificationGroup.save(function(err, classificationGroup) {
                        if (!err) {
                            reply(classificationGroup).created('/ClassificationGroup/' + classificationGroup._id); // HTTP 201
                        } else {
                             if (11000 === err.code || 11001 === err.code) 
                                    reply(Boom.forbidden("please provide another classification group id, it already exist"));
                             else reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                        }
                    });
                }
                    
                else
                    reply(Boom.forbidden("Not allowed"));
            } 
            else {
                reply(Boom.badImplementation(err)); // 500 error
            }
        });
};

/** get one ClassificationGroup by id */
exports.GetClassificationGroup = function(request, reply) {
    ClassificationGroup.findOne({
        '_id': request.params.id
    }).populate('classificationRef')
      .populate('classGrp2Attributes.attributeRef')
      .populate('parentClassificationGrpRef','classificationGroupId')
      .exec(function(err, classificationGroup) {
        if (!err && classificationGroup) {
            classificationGroup.classGrp2Attributes.sort('sortNo');
            reply(classificationGroup);
        } else if (err) {
            // Log it, but don't show the user, don't want to expose ourselves (think security)
            console.log(err);
            reply(Boom.notFound());
        } else {
            reply(Boom.notFound());
        }
    });
};

/** Update Existing ClassificationGroup */
exports.UpdateClassificationGroup = function(request, reply) {
   ClassificationGroup.findById(request.params.id , function(err, classificationGroup) {
         if (err) {
            // Log it, but don't show the user, don't want to expose ourselves (think security)
            reply(Boom.notFound());
        } else {
            Common.updateHelper(request.payload,classificationGroup);

        ClassificationGroup.find({'_id':classificationGroup.parentClassificationGrpRef})
        .populate('parentClassificationGrpRef')
        .exec(function(err, attribute) {
            if (!err) {
                if(attribute.parentClassificationGrpRef === undefined){
                 classificationGroup.save(function(err, data) {
                        if (!err) {
                            reply(data).created('/classificationGroup/' + data._id); // HTTP 201
                        } else {
                            reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                        }
                 });
                }
                    
                else
                    reply(Boom.forbidden("Not allowed"));
            }
            else {
                reply(Boom.badImplementation(err)); // 500 error
            }
        });

        }
   });
};
/**delete one ClassificationGroup by id */
exports.DeleteClassificationGroup = function(request, reply) {
    ClassificationGroup.findOne({
        '_id': request.params.id
    }, function(err, classificationGroup) {
        if (!err && classificationGroup) {
            classificationGroup.remove();
            reply({
                message: "classificationGroup deleted successfully"
            });
        } else if (!err) {
            // Couldn't find the object.
            reply(Boom.notFound());
        } else {
            console.log(err);
            reply(Boom.badRequest("Could not delete classificationGroup"));
        }
    });
};

/**classification Group search*/
exports.SearchClassificationGroup = function(request, reply) {

    var query = {};

    if (request.payload.classificationRef) query['classificationRef'] = request.payload.classificationRef;
    if (request.payload.descShort) query['descriptions.descShort.description'] = new RegExp(request.payload.descShort, "i");
    if (request.payload.descLong) query['descriptions.descLong.description'] = new RegExp(request.payload.descLong, "i");
    if (request.payload.description) query['descriptions.descShort.description'] = new RegExp(request.payload.description, "i");
    if(query['classificationRef'] === undefined){
        return reply(Boom.forbidden("Please provide classification"));
    }
    else{
        ClassificationGroup
        .find(query)
        .sort('classificationGroupId')
        .exec(function(err, classificationGroup) {
            if (!err && classificationGroup) {
                reply(classificationGroup);
            } else if (err) {
                // Log it, but don't show the user, don't want to expose ourselves (think security)
                console.log(err);
                reply(Boom.notFound());
            } else {

                reply(Boom.notFound());
            }
        });
    }
    
};
/**classification Group tree*/
exports.ClassificationGroupTree = function(request, reply) {
   
    ClassificationGroup
        .find({classificationRef: request.params.id})
        .populate('classificationRef')
        .populate('parentClassificationGrpRef')
        .sort({'timestamp.createdOn': 1})
        .exec(function(err, classificationGroup) {
        if (!err && classificationGroup) {
            if(classificationGroup != null ) reply(GetClassificationGroupTree(classificationGroup));
            else reply(classificationGroup);
        } else if (err) {
            // Log it, but don't show the user, don't want to expose ourselves (think security)
            console.log(err);
            reply(Boom.notFound());
        } else {

            reply(Boom.notFound());
        }
    });
};

/**search query for classification Group*/
GetClassificationGroupTree = function(array) {
    var obj = {};
    if(array[0]){
    obj['classificationId'] = array[0].classificationRef.classificationId;
    obj['classification_id'] = array[0].classificationRef._id;
    obj['parent']={};
    for( var index=0; index<array.length; index++ ){        
        if(array[index].parentClassificationGrpRef != undefined || array[index].parentClassificationGrpRef != null ){
            var id = array[index].parentClassificationGrpRef._id;
            var subchild = knowchild(obj,id);
            if( subchild != undefined){
                if(subchild['child'] == undefined) subchild['child'] = {};
                if(subchild['child'][array[index]._id] == undefined) subchild['child'][array[index]._id] = {}
                subchild['child'][array[index]._id]['child_id'] = array[index]._id;
               
                subchild['child'][array[index]._id]['childId'] = array[index].classificationGroupId;
                subchild['child'][array[index]._id]['description'] = array[index].descriptions.descShort[0].description;
            }
            else{
                if(obj['parent'][id] == undefined || obj['parent'][id] == null ) obj['parent'][id] = {};

                obj['parent'][id]['parentId'] = array[index].parentClassificationGrpRef.classificationGroupId;
                obj['parent'][id]['parent_id'] = array[index].parentClassificationGrpRef._id;
                obj['parent'][id]['description'] = array[index].parentClassificationGrpRef.descriptions.descShort[0].description;
                if (obj['parent'][id]['child']== undefined || obj['parent'][id]['child']== null) obj['parent'][id]['child'] = {};   
                if(obj['parent'][id]['child'][array[index]._id] == undefined || obj['parent'][id]['child'][array[index]._id] == null)
                    obj['parent'][id]['child'][array[index]._id]={};

                obj['parent'][id]['child'][array[index]._id]['childId'] = array[index].classificationGroupId;
                obj['parent'][id]['child'][array[index]._id]['child_id'] = array[index]._id;    
                obj['parent'][id]['child'][array[index]._id]['description'] = array[index].descriptions.descShort[0].description;
            }
            
                
                       
        }
        else{
            var id = array[index]._id;
            var subchild = knowchild(obj,id);
            if( subchild != undefined){
                if(subchild['child'] == undefined) subchild['child'] = {};
                if(subchild['child'][array[index]._id] == undefined) subchild['child'][array[index]._id] = {}
                subchild['child'][array[index]._id]['child_id'] = array[index]._id;
                subchild['child'][array[index]._id]['childId'] = array[index].classificationGroupId;
                subchild['child'][array[index]._id]['description'] = array[index].descriptions.descShort[0].description;
            }
            else{
                if(obj['parent'][id] == undefined || obj['parent'][id] == null ) obj['parent'][id] = {};
                obj['parent'][id]['parentId'] = array[index].classificationGroupId;
                obj['parent'][id]['parent_id'] = array[index]._id; 
                obj['parent'][id]['description'] = array[index].descriptions.descShort[0].description; 
            }
        }
    }
    }
    var returnObj = {
        "classificationId": obj['classificationId'],
        "classification_id": obj['classification_id'],
        "parent" : [],
        "dropdownData": []
    }
    
    for(var key in obj['parent']){ 
        var groupObject = {};  
        var product = {};
        product['parentId'] = obj['parent'][key]['parentId'];
        product['parent_id'] = obj['parent'][key]['parent_id'];
        product['description'] = obj['parent'][key]['description'];

        groupObject['parentId'] = obj['parent'][key]['parentId'];
        groupObject['parent_id'] = obj['parent'][key]['parent_id'];
        returnObj.dropdownData.push(groupObject);

        if(obj['parent'][key]['child'] !== undefined){
            product['child'] = [];
            for(var childkey in obj['parent'][key]['child']){
                var groupObject1 = {};
                if(obj['parent'][key]['child'] !== undefined){
                   groupObject1['parentId'] = obj['parent'][key]['child'][childkey]['childId'];
                    groupObject1['parent_id'] = obj['parent'][key]['child'][childkey]['child_id'];
                    returnObj.dropdownData.push(groupObject1);   
                    var child ={
                        "childId" : obj['parent'][key]['child'][childkey]['childId'],
                        "child_id" : obj['parent'][key]['child'][childkey]['child_id'], 
                        "description" : obj['parent'][key]['child'][childkey]['description'],
                        "subchild": []
                    }                   
                     if(obj['parent'][key]['child'][childkey]['child'] !== undefined){
                        for(var subchildkey in obj['parent'][key]['child'][childkey]['child']){
                            var subchild ={
                                "childId" : obj['parent'][key]['child'][childkey]['child'][subchildkey]['childId'],
                                "child_id" : obj['parent'][key]['child'][childkey]['child'][subchildkey]['child_id'],
                                "description" : obj['parent'][key]['child'][childkey]['child'][subchildkey]['description']
                            }
                            child.subchild.push(subchild);
                        }
                        product['child'].push(child);
                     }
                     else{
                        product['child'].push(child);
                     }
                 }
             }
         }
         returnObj.parent.push(product);
    }
    return returnObj;
};

function knowchild(obj,id){
    for(var localobj in obj['parent']){
        if(obj['parent'][localobj]['child'] == undefined || obj['parent'][localobj]['child'] == null ){
            
        }
        else{ 
            if(obj['parent'][localobj]['child'][id] == undefined || obj['parent'][localobj]['child'][id] == null){}
                
            else
                return obj['parent'][localobj]['child'][id];
        }
    }

}

exports.GetAttributes = function(request, reply){
    ClassificationGroup
        .findOne({parentClassificationGrpRef: request.params.id},{parentClassificationGrpRef:1, classGrp2Attributes:1})
        .populate('parentClassificationGrpRef')
        .populate('classGrp2Attributes.attributeRef')
        .exec(function(err, classificationGroup) {
            if (!err && classificationGroup){
                classificationGroup.classGrp2Attributes.sort('sortNo');
                GetRefactor(request,reply,classificationGroup,'parent');
            }  
            else{
                 ClassificationGroup
                    .findOne({_id: request.params.id},{parentClassificationGrpRef:1, classGrp2Attributes:1})
                    .populate('parentClassificationGrpRef')
                    .populate('classGrp2Attributes.attributeRef')
                    .exec(function(err, classificationGroup) {
                        if (!err && classificationGroup){
                            classificationGroup.classGrp2Attributes.sort('sortNo');
                            GetRefactor(request,reply,classificationGroup,'child');
                        } 
                        else reply(Boom.notFound());
                        }); 
            }
        });                        
};


GetRefactor = function(request,reply,classificationGroup,parameter) {
    Attribute
    .populate(classificationGroup.parentClassificationGrpRef,
    {path: 'classGrp2Attributes.attributeRef'},function(){
    ClassificationGroup
        .populate(classificationGroup.parentClassificationGrpRef,
        {path: 'parentClassificationGrpRef'},function(error,object){
        if(object){
        Attribute
                .populate(object.parentClassificationGrpRef,
                {path: 'classGrp2Attributes.attributeRef'},function(){
                    // reply(classificationGroup);
                    reply(GetAttributeData(parameter,classificationGroup));
        });
        }
        else reply(GetAttributeData(parameter,classificationGroup));
    });
    });
}


GetAttributeData = function(value,data) {
    var completeData = [];
    if(value == 'child' && data.classGrp2Attributes){
       var array = data.classGrp2Attributes;
        arrayCall(array,completeData);
    }
    if(data.parentClassificationGrpRef){
        if(data.parentClassificationGrpRef.classGrp2Attributes){
           var array = data.parentClassificationGrpRef.classGrp2Attributes;
           arrayCall(array,completeData);
        }
        if(data.parentClassificationGrpRef.parentClassificationGrpRef){
            if(data.parentClassificationGrpRef.parentClassificationGrpRef.classGrp2Attributes){
                var array = data.parentClassificationGrpRef.parentClassificationGrpRef.classGrp2Attributes;
                arrayCall(array,completeData);
            }
        }
    }
    return completeData;  
}
arrayCall = function(array,completeData){
    for( var index=0; index<array.length; index++ ){
        var obj = {};
        obj['attributeId'] = array[index].attributeRef.attributeId;
        if(array[index].attributeRef.descriptions.descShort[0]) obj['description'] = array[index].attributeRef.descriptions.descShort[0].description;
        obj['sortNo'] = array[index].sortNo;
        obj['grpId'] = array[index].grpId;
        completeData.push(obj);
    }
    completeData.sort(function (a, b) {
      if (a.sortNo > b.sortNo) return 1;
      if (a.sortNo < b.sortNo) return -1;
      return 0;
    }); 
}
/** get one classificationGroup details based on attributeId*/
exports.GetOne = function(request, reply) {
    ClassificationGroup
    .findOne({'classificationRef':request.params.id1,'classificationGroupId':request.params.id2})
    .populate('parentClassificationGrpRef')
    .exec(function(err, classificationGroup) {
        if (!err) {
            var obj = {};
            obj['exist'] = 'true';
            obj['subchild'] = 'false';
            if(classificationGroup){
                obj['_id'] = classificationGroup._id;
                if(classificationGroup.parentClassificationGrpRef)  
                    if(classificationGroup.parentClassificationGrpRef.parentClassificationGrpRef) obj['subchild'] = 'true'; 
                    else {}    
                else {}
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