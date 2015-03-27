//Bring mongoose into the project
var mongoose = require('mongoose');
//Build the connection string
var dbURI = 'mongodb://localhost/MongoosePM';

//Create the database connection
mongoose.connect(dbURI);


//Catching the events
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connected error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

//Close connection when app stop
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through app termination');
    });
    process.exit(0);
});
