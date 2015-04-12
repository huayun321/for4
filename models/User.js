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
    username: {type: String, require: true, trim: true},
    //profile
    real_name: {type: String, trim: true},
    sex: {type: String},
    age: {type: String},
    phone: {type: String, trim: true},
    qq: {type: String, trim: true},
    birthday_y: String,
    birthday_m: String,
    birthday_d: String,
    //avatar
    url: String,
    size: Number,
    thumbnail_url: {type: String, default: '/chao/img/miao.jpg'},
    delete_path: String,
    thumbnail_delete_path: String,
    created_on:{type:Date, default:Date.now()},
    //rate
    user_title: {type:String, default:"初级用户"},
    user_rate: {type:String, default:0}
});

var User = mongoose.model('User', schema);
module.exports = User;