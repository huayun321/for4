//Bring mongoose into the project
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
/***************************************************
 * Ruby SCHEMA
 * *************************************************/

var rubySchema = mongoose.Schema({
    tags: [String],
    url: String,
    size: Number,
    tname: String,
    thumbnail_url: String,
    delete_path: String,
    thumbnail_delete_path: String,
    createdOn: { type: Date, default: Date.now }
});

rubySchema.plugin(mongoosePaginate);


//Build the User model
var Ruby = mongoose.model('Ruby', rubySchema);
module.exports = Ruby;