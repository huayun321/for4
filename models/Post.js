//Bring mongoose into the project
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
/***************************************************
 * Ruby SCHEMA
 * *************************************************/

var postSchema = mongoose.Schema({
    title: {type: String, require: true, trim: true},
    content: {type: String, require: true, trim: true},
    category: {type: String, require: true},
    url: String,
    size: Number,
    thumbnail_url: String,
    delete_path: String,
    thumbnail_delete_path: String,
    createdOn: { type: Date, default: Date.now },
    is_nice:{ type: Boolean, default: false }
});

postSchema.plugin(mongoosePaginate);

//Build the User model
var Post = mongoose.model('Post', postSchema);
module.exports = Post;