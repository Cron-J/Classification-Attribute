var Mongoose = require('mongoose'); 
var config = require('./settings');

Mongoose.connect(config.DB.url);  
//Mongoose.connect('mongodb://' + config.DB.host + '/' + config.DB.databaseName);  
var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));  
db.once('open', function callback() {  
    console.log("Connection with database succeeded.");
});

exports.Mongoose = Mongoose;  
exports.db = db;  
