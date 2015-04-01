/**
* Dependencies.
*/
var path = require('path')
module.exports = {
    server: {
        listenHost: 'localhost',
        listenPort: 8080,                                   // The port on which the server is to listen (means that the app is at http://localhost:8081 for instance)
        securePort: 8082,                                   // The HTTPS port on which the server is to listen (means that the app is at https://localhost:8082 for instance)
        distFolder: path.resolve(__dirname, '../../client/dist'),  // The folder that contains the application files (note that the files are in a different repository) - relative to this file
        staticUrl: '/static',                               // The base url from which we serve static files (such as js, css and images)
        cookieSecret: 'event'                         // The secret for encrypting the cookie
    },
    DB: {
        dialect: "mongodb",
        host: '127.0.0.1',
        port: 27017,
        databaseName : "classification-attribute",
        userName : "event",
        password : "event",
        //url: "mongodb://<user>:<password>@<url>"

    },
    configuration : {
        isDebugMode : false
    }
};