//Bring mongoose into the project
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
/***************************************************
 * Ruby SCHEMA
 * *************************************************/

var schema = mongoose.Schema({
    content: {type: String, require: true, trim: true},
    url: String,
    size: Number,
    thumbnail_url: String,
    delete_path: String,
    thumbnail_delete_path: String,
    created_on: { type: Date, default: Date.now },
    is_nice:{ type: Boolean, default: false },
    created_by: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    reply_to: {index: true, type:mongoose.Schema.Types.ObjectId, ref: 'Post'}
});

schema.plugin(mongoosePaginate);

//Build the User model
var PComment = mongoose.model('PComment', schema);
module.exports = PComment;