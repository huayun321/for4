//Bring mongoose into the project
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
/***************************************************
 * Ruby SCHEMA
 * *************************************************/

var schema = mongoose.Schema({
    content: {type: String, require: true, trim: true},
    created_on: { type: Date, default: Date.now },
    created_by: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    reply_to: {index: true, type:mongoose.Schema.Types.ObjectId, ref: 'Ruby'}
});

schema.plugin(mongoosePaginate);

//Build the User model
var RComment = mongoose.model('RComment', schema);
module.exports = RComment;