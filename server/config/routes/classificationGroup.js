/**
 * Dependencies.
 */
var ClassificationGroupController = require('../../controllers/classificationGroup');

module.exports = exports = function(server) {
    console.log('Loading ClassificationGroup routes');
    exports.indexes(server);
    exports.create(server);
    exports.update(server);
    exports.show(server);
    exports.remove(server);
    exports.search(server);
    exports.tree(server);
    exports.attribute(server);
    exports.getOne(server);
};

/**
 * GET /events
 * Gets all the ClassificationGroup from MongoDb and returns them.
 *
 * @param server - The Hapi Server
 */
exports.indexes = function(server) {
    // GET
    server.route({
        method: 'GET',
        path: '/classificationGroup',
        config: {
            handler: ClassificationGroupController.GetAll
        }
    });
};

// /**
//  * POST /new
//  * Creates a new ClassificationGroup in the datastore.
//  *
//  * @param server - The Hapi Serve
//  */
exports.create = function(server) {
    // POST
    server.route({
        method: 'POST',
        path: '/classificationGroup',
        config: {
            handler: ClassificationGroupController.Create
        }
    });
};


// /**
//  * GET /classificationGroup/{id}
//  * Gets the ClassificationGroup based upon the {id} parameter.
//  *
//  * @param server
//  */
exports.show = function(server) {

    server.route({
        method: 'GET',
        path: '/classificationGroup/{id}',
        config: {
            handler: ClassificationGroupController.GetClassificationGroup
        }
    });
};
// /**
//  * Update /classificationGroup/{id}
//  * Update an ClassificationGroup, based on the  id in the path.
//  *
//  * @param server - The Hapi Server
//  */
exports.update = function(server) {
    server.route({
        method: 'PUT',
        path: '/classificationGroup/{id}',
        config: {
            handler: ClassificationGroupController.UpdateClassificationGroup
        }
    })
};
// /**
//  * DELETE /classificationGroup/{id}
//  * Deletes an ClassificationGroup, based on the classificationGroup id in the path.
//  *
//  * @param server - The Hapi Server
//  */
exports.remove = function(server) {
    server.route({
        method: 'DELETE',
        path: '/classificationGroup/{id}',
        config: {
            handler: ClassificationGroupController.DeleteClassificationGroup
        }
    });
};

/**classificationGrouptree*/
exports.tree = function(server) {
    server.route({
        method: 'GET',
        path: '/classificationGroupTree/{id}',
        config: {
            handler: ClassificationGroupController.ClassificationGroupTree
        }
    });
};

/**classificationGroup search*/
exports.search = function(server) {
    server.route({
        method: 'POST',
        path: '/classificationGroupSearch',
        config: {
            handler: ClassificationGroupController.SearchClassificationGroup
        }
    });
};
/**get attributes*/
exports.attribute = function(server) {
    server.route({
        method: 'GET',
        path: '/getAttributes/{id}',
        config: {
            handler: ClassificationGroupController.GetAttributes
        }
    });
};
// /**
//  * Get classificationGroup
//  *
//  * @param server - The Hapi Server
//  */
exports.getOne = function(server) {
    server.route({
        method: 'GET',
        path: '/classificationGroupOne/{id1}/{id2}',
        config: {
            handler: ClassificationGroupController.GetOne
        }
    });
};