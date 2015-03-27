/**
 * Dependencies.
 */
var TenantsController = require('../../controllers/tenant');

module.exports = exports = function(server) {
    console.log('Loading Tenants routes');
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
 * Gets all the Tenants from MongoDb and returns them.
 *
 * @param server - The Hapi Server
 */
exports.indexes = function(server) {
    // GET
    server.route({
        method: 'GET',
        path: '/tenants',
        config: {
            handler: TenantsController.GetAll
        }
    });
};

/**
 * POST /new
 * Creates a new Tenants in the datastore.
 *
 * @param server - The Hapi Serve
 */
exports.create = function(server) {
    // POST

    server.route({
        method: 'POST',
        path: '/tenants',
        config: {
            handler: TenantsController.Create
        }

    });
};


/**
 * GET /tenants/{id}
 * Gets the Tenants based upon the {id} parameter.
 *
 * @param server
 */
exports.show = function(server) {

    server.route({
        method: 'GET',
        path: '/tenants/{id}',
        config: {
            handler: TenantsController.GetTenant
        }
    })
};
/**
 * Update /tenants/{id}
 * Update an Tenant, based on the  id in the path.
 *
 * @param server - The Hapi Server
 */
exports.update = function(server) {
    server.route({
        method: 'PUT',
        path: '/tenants/{id}',
        config: {
            handler: TenantsController.UpdateTenant
        }
    })
};
// /**
//  * search /tenantSearch
//  * Search an Tenant using searchQuery
//  *
//  * @param server - The Hapi Server
//  */
exports.search = function(server) {
    server.route({
        method: 'POST',
        path: '/tenantSearch',
        config: {
            handler: TenantsController.SearchTenant
        }
    });
}
/**
 * DELETE /tenants/{id}
 * Deletes an Tenants, based on the tenants id in the path.
 *
 * @param server - The Hapi Server
 */
exports.remove = function(server) {
    server.route({
        method: 'DELETE',
        path: '/tenants/{id}',
        config: {
            handler: TenantsController.DeleteTenant
        }
    })
};
//**
//  * Get tenant
//  *
//  * @param server - The Hapi Server
//  */
exports.getOne = function(server) {
    server.route({
        method: 'GET',
        path: '/tenantOne/{id}',
        config: {
            handler: TenantsController.GetOne
        }
    });
};