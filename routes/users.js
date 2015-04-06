var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET signup page. */
router.get('/signup', function(req, res, next) {
  res.render('register', { title: '918diy-用户注册' })
});

/* POST signup page. */
router.post('/signup', function(req, res, next) {
    //todo check user form data
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
    });
    //check if email exist

    user.save(function(err) {
        if(err) {
            if(err.code == 11000) {
                //todo req.flash
                console.log(err);
                res.json(err);
            }
        }
        res.json(err);
    });
});

/* GET login page. */
router.get('/login', function(req, res, next) {

    res.send(user);
});

/* GET login page. */
router.get('/logout', function(req, res, next) {
    res.send('logout');
});

/* GET login page. */
router.get('/profile', function(req, res, next) {
    res.send('logout');
});

/* GET login page. */
router.get('/forgot', function(req, res, next) {
    res.send('logout');
});

module.exports = router;
