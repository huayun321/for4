//Bring mongoose into the project
var mongoose = require('mongoose');
/***************************************************
 * Template SCHEMA
 * *************************************************/

var templateSchema = mongoose.Schema({
    size: String,
    shape: {type: String, index:true},
    obj: String,
    createdOn: { type: Date, default: Date.now }
});

//Build the User model
var Template = mongoose.model('Template', templateSchema);
module.exports = Template;