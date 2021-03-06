//Bring mongoose into the project
var mongoose = require('mongoose');
/***************************************************
 * MATERIAL SCHEMA
 * *************************************************/

var materialSchema = mongoose.Schema({
    tags: [String],
    url: String,
    size: Number,
    thumbnail_url: String,
    delete_path: String,
    thumbnail_delete_path: String,
    createdOn: { type: Date, default: Date.now }
});

//Build the User model
var Material = mongoose.model('Material', materialSchema);
module.exports = Material;