/**
 * Dependencies.
 */
var ClassificationController = require('../../controllers/classification');

module.exports = exports = function(server) {
    console.log('Loading Classification routes');
    exports.indexes(server);
    exports.create(server);
    exports.update(server);
    exports.show(server);
    exports.remove(server);
    exports.search(server);
};

/**
 * GET /events
 * Gets all the Classification from MongoDb and returns them.
 *
 * @param server - The Hapi Server
 */
exports.indexes = function(server) {
    // GET
    server.route({
        method: 'GET',
        path: '/classification',
        config: {
            handler: ClassificationController.GetAll
        }
    });
};

// /**
//  * POST /new
//  * Creates a new Classification in the datastore.
//  *
//  * @param server - The Hapi Serve
//  */
exports.create = function(server) {
    // POST
    server.route({
        method: 'POST',
        path: '/classification',
        config: {
            handler: ClassificationController.Create
        }

    });
};


// /**
//  * GET /classification/{id}
//  * Gets the Classification based upon the {id} parameter.
//  *
//  * @param server
//  */
exports.show = function(server) {

    server.route({
        method: 'GET',
        path: '/classification/{id}',
        config: {
            handler: ClassificationController.GetClassification
        }
    });
};
// /**
//  * Update /classification/{id}
//  * Update an Classification, based on the  id in the path.
//  *
//  * @param server - The Hapi Server
//  */
exports.update = function(server) {
    server.route({
        method: 'PUT',
        path: '/classification/{id}',
        config: {
            handler: ClassificationController.UpdateClassification
        }
    });
};
// /**
//  * DELETE /classification/{id}
//  * Deletes an Classification, based on the classification id in the path.
//  *
//  * @param server - The Hapi Server
//  */
exports.remove = function(server) {
    server.route({
        method: 'DELETE',
        path: '/classification/{id}',
        config: {
            handler: ClassificationController.DeleteClassification
        }
    });
};

// /**
//  * search /classificationSearch
//  * search Classification by search query
//  *
//  * @param server - The Hapi Server
//  */
exports.search = function(server) {
    server.route({
        method: 'POST',
        path: '/classificationSearch',
        config: {
            handler: ClassificationController.SearchClassification
        }
    });
};