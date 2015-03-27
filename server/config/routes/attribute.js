/**
 * Dependencies.
 */
var AttributeController = require('../../controllers/attribute');

module.exports = exports = function(server) {
    console.log('Loading Attribute routes');
    exports.indexes(server);
    exports.create(server);
    exports.update(server);
    exports.show(server);
    exports.remove(server);
    exports.search(server);
    exports.getOne(server);
    exports.measureData(server);
};

/**
 * GET /events
 * Gets all the Attribute from MongoDb and returns them.
 *
 * @param server - The Hapi Server
 */
exports.indexes = function(server) {
    // GET
    server.route({
        method: 'GET',
        path: '/attribute',
        config: {
            handler: AttributeController.GetAll
        }
    });
};

// /**
//  * POST /new
//  * Creates a new Attribute in the datastore.
//  *
//  * @param server - The Hapi Serve
//  */
exports.create = function(server) {
    // POST
    console.log("routepost");
    server.route({
        method: 'POST',
        path: '/attribute',
        config: {
            handler: AttributeController.Create
        }
    });
};


// /**
//  * GET /attribute/{id}
//  * Gets the Attribute based upon the {id} parameter.
//  *
//  * @param server
//  */
exports.show = function(server) {

    server.route({
        method: 'GET',
        path: '/attribute/{id}',
        config: {
            handler: AttributeController.GetAttribute
        }
    });
};

// /**
//  * Update /attribute/{id}
//  * Update an Attribute, based on the  id in the path.
//  *
//  * @param server - The Hapi Server
//  */
exports.update = function(server) {
    server.route({
        method: 'PUT',
        path: '/attribute/{id}',
        config: {
            handler: AttributeController.UpdateAttribute
        }
    });
};

// /**
//  * DELETE /attribute/{id}
//  * Deletes an Attribute, based on the attribute id in the path.
//  *
//  * @param server - The Hapi Server
//  */
exports.remove = function(server) {
    server.route({
        method: 'DELETE',
        path: '/attribute/{id}',
        config: {
            handler: AttributeController.DeleteAttribute
        }
    });
};

// /**
//  * search /attributeSearch
//  * Search an Attribute using searchQuery
//  *
//  * @param server - The Hapi Server
//  */
exports.search = function(server) {
    server.route({
        method: 'POST',
        path: '/attributeSearch',
        config: {
            handler: AttributeController.SearchAttribute
        }
    });
};

// /**
//  * Get measure-list
//  *
//  * @param server - The Hapi Server
//  */
exports.measureData = function(server) {
    server.route({
        method: 'GET',
        path: '/getStaticData',
        config: {
            handler: AttributeController.getStaticData
        }
    });
};
// /**
//  * Get attribute
//  *
//  * @param server - The Hapi Server
//  */
exports.getOne = function(server) {
    server.route({
        method: 'GET',
        path: '/attributeOne/{id}',
        config: {
            handler: AttributeController.GetOne
        }
    });
};