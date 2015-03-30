/**
 * Dependencies.
 */
var Hapi = require('hapi'),
    config = require('./server/config/settings'),
    routes = require('./server/config/routes'),
    db = require('./server/config/database'),
    Ejs = require('ejs'),
    Wreck = require('wreck'),
    util = require('util');

// FOR API SERVER:
var server = Hapi.createServer(config.server.listenHost, config.server.listenPort, {cors: true});

// Add the server routes
routes.init(server);

var notFound = function(request, reply) {
    reply('The page was not found').code(404);
};

server.route({
    method: '*',
    path: '/{p*}',
    handler: notFound
});


var API = {
    call: function(opts) {
        // var url = 'http://'+options.apiIP+opts.url;
        var url = 'http://'+ config.server.listenHost +":"+config.server.listenPort+opts.url;

        var requestOptions = {                   
            headers: { 'content-type':'application/json'}
        };

        // Add payload
        if(opts.payload) {
            requestOptions.payload = JSON.stringify(opts.payload);
        }
        // Add auth
        // var header = Hawk.client.header(url, opts.method, { credentials: opts.credentials });
        // requestOptions.headers.Authorization = header.field;
        
        // Make call
        if(opts.method === 'POST' || opts.method === 'post')
        {
            Wreck.post(url, requestOptions, opts.callback)
        }
        else if(opts.method === 'PUT' || opts.method === 'put')
        {
            Wreck.put(url, requestOptions, opts.callback)
        }
        else if(opts.method === 'DELETE' || opts.method === 'delete')
        {
            Wreck.delete(url, requestOptions, opts.callback)
        }
        else
        {
            Wreck.get(url, requestOptions, opts.callback);
        }
    }
};


server.route({
        path: "/api/{path*}",
        method: ["GET","POST","PUT","DELETE"],
        handler: function(request, reply) {
            API.call({
                method: request.method,
                url: request.path.substring(4),     // slice out the '/api' part from the request path
                payload: request.payload,
                // credentials: options.coreCreds,
                callback: function(err, res, payload) {
                    if (err) throw err;
                    else 
                        reply(payload);
                }
            });
        }
    });
server.route({
    method: 'GET',
    path: '/upload/{params*}',
    handler: {
        directory: { path: './upload' }
    }
});

server.route({
    method: 'GET',
    path: '/{params*}',
    handler: {
        directory: { path: './client/src' }
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: {
      file: "./client/src/index.html"
    }
});

server.start(function () {
  console.log('Server started ', server.info.uri);
});