/**
 * Dependencies.
 */
var AttributeSectionController = require('../../controllers/attributeSection');

module.exports = exports = function(server) {
    console.log('Loading Attribute Section routes');
    exports.indexes(server);
    exports.create(server);
    exports.update(server);
    exports.show(server);
    exports.remove(server);
    exports.search(server);
    exports.getOne(server);
};

/**
 * GET /events
 * Gets all the AttributeSection from MongoDb and returns them.
 *
 * @param server - The Hapi Server
 */
exports.indexes = function(server) {
    // GET
    server.route({
        method: 'GET',
        path: '/attributeSection',
        config: {
            handler: AttributeSectionController.GetAll
        }
    });
};

// /**
//  * POST /new
//  * Creates a new AttributeSection in the datastore.
//  *
//  * @param server - The Hapi Serve
//  */
exports.create = function(server) {
    // POST
    server.route({
        method: 'POST',
        path: '/attributeSection',
        config: {
            handler: AttributeSectionController.Create
        }

    });
};


// /**
//  * GET /attributeSection/{id}
//  * Gets the Attribute Section based upon the {id} parameter.
//  *
//  * @param server
//  */
exports.show = function(server) {

    server.route({
        method: 'GET',
        path: '/attributeSection/{id}',
        config: {
            handler: AttributeSectionController.GetAttributeSection
        }
    });
};
// /**
//  * Update /attributeSection/{id}
//  * Update an Attribute Section, based on the  id in the path.
//  *
//  * @param server - The Hapi Server
//  */
exports.update = function(server) {
    server.route({
        method: 'PUT',
        path: '/attributeSection/{id}',
        config: {
            handler: AttributeSectionController.UpdateAttributeSection
        }
    });
};
// /**
//  * DELETE /attributeSection/{id}
//  * Deletes an Attribute Section, based on the attributeSection id in the path.
//  *
//  * @param server - The Hapi Server
//  */
exports.remove = function(server) {
    server.route({
        method: 'DELETE',
        path: '/attributeSection/{id}',
        config: {
            handler: AttributeSectionController.DeleteAttributeSection
        }
    });
};

// /**
//  * search /attributeSectionSearch
//  * Search list of Attribute Section.
//  *
//  * @param server - The Hapi Server
//  */
exports.search = function(server) {
    server.route({
        method: 'POST',
        path: '/attributeSectionSearch',
        config: {
            handler: AttributeSectionController.SearchAttributeSection
        }
    });
};
// /**
//  * Get attributeSection
//  *
//  * @param server - The Hapi Server
//  */
exports.getOne = function(server) {
    server.route({
        method: 'GET',
        path: '/attributeSectionOne/{id}',
        config: {
            handler: AttributeSectionController.GetOne
        }
    });
};