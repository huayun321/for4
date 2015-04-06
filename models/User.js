//Bring mongoose into the project
var mongoose = require('mongoose');
/***************************************************
 * User SCHEMA
 * *************************************************/


var schema = mongoose.Schema({
    //for auth
    email: {type: String, require: true, trim: true, unique: true},
    password: {type: String, require: true},
    admin: {type: Boolean, default: false},
    //profile
    username: {type: String, require: true, trim: true}
});

var User = mongoose.model('User', schema);
module.exports = User;