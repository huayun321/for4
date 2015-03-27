//Bring mongoose into the project
var mongoose = require('mongoose');
/***************************************************
 * MATERIAL SCHEMA
 * *************************************************/

var materialSchema = mongoose.Schema({
    tags: [String],
    img: String,
    thumbnail: String,
    createdOn: { type: Date, default: Date.now }
});

//Build the User model
mongoose.model('Material', materialSchema);