/**
 * Dependencies.
 */
var StatusController = require('../../controllers/status');

module.exports = exports = function(server) {
    console.log('Loading Status routes');
    exports.indexes(server);
    exports.create(server);
    exports.update(server);
    exports.show(server);
    exports.remove(server);
};

/**
 * GET /events
 * Gets all the status from MongoDb and returns them.
 *
 * @param server - The Hapi Server
 */
exports.indexes = function(server) {
    // GET
    server.route({
        method: 'GET',
        path: '/status',
        config: {
            handler: StatusController.GetAll
        }
    });
};

/**
 * POST /new
 * Creates a new status in the datastore.
 *
 * @param server - The Hapi Serve
 */
exports.create = function(server) {
    // POST

    server.route({
        method: 'POST',
        path: '/status',
        config: {
            handler: StatusController.Create
        }

    });
};


/**
 * GET /status/{id}
 * Gets the status based upon the {id} parameter.
 *
 * @param server
 */
exports.show = function(server) {

    server.route({
        method: 'GET',
        path: '/status/{id}',
        config: {
            handler: StatusController.Get
        }
    })
};
/**
 * Update /status/{id}
 * Update an status, based on the  id in the path.
 *
 * @param server - The Hapi Server
 */
exports.update = function(server) {
    server.route({
        method: 'PUT',
        path: '/status/{id}',
        config: {
            handler: StatusController.Update
        }
    })
};

/**
 * DELETE /status/{id}
 * Deletes an status, based on the status id in the path.
 *
 * @param server - The Hapi Server
 */
exports.remove = function(server) {
    server.route({
        method: 'DELETE',
        path: '/status/{id}',
        config: {
            handler: StatusController.Delete
        }
    })
};
