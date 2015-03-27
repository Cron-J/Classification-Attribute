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

// Create a server with a host, port, and options
var pack = new Hapi.Pack();

// FOR API SERVER:
var api_server = pack.server(config.server.listenHost, config.server.listenPort); //, {

// Add the server routes
routes.init(api_server);

var notFound = function(request, reply) {
    reply('The page was not found').code(404);
};

api_server.route({
    method: '*',
    path: '/{p*}',
    handler: notFound
});

var goodOptions = {
    subscribers: {
        console: ['ops', 'request', 'log', 'error']
    }
};

pack.register([
    {
        name: 'good',
        plugin: require('good'),
        options: goodOptions
    }
], function(err) {
    if (err) throw err;
    // pack.start
});

// FOR GUI SERVER
var gui_server = pack.server(config.client.listenHost, config.client.listenPort);

// db.init();
var API = {
    call: function(opts) {
        // var url = 'http://'+options.apiIP+opts.url;
        var url = 'http://'+ config.server.listenHost +":"+config.server.listenPort+opts.url;

            console.log(url)


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


gui_server.route({
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
gui_server.route({
    method: 'GET',
    path: '/upload/{params*}',
    handler: {
        directory: { path: './upload' }
    }
});

gui_server.route({
    method: 'GET',
    path: '/{params*}',
    handler: {
        directory: { path: './client/src' }
    }
});
gui_server.route({
    method: 'GET',
    path: '/',
    handler: {
      file: "./client/src/index.html"
    }
});

pack.start(function(){
    console.log("api server started at "+pack._servers[0].info.uri);
    console.log("gui server started at "+pack._servers[1].info.uri);
})