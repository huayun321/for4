var express = require('express');
var router = express.Router();
var User = require('../models/User');
var passport = require('passport');


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


    user.save(function(err) {
        if(err) {
            //check if email exist
            if(err.code == 11000) {
                req.flash('error', '邮箱地址已被使用，请使用其他邮箱注册。')
                res.redirect('/users/signup');
            } else {
                console.log(err);
                res.render('500', {title:'500'});
            }
        } else {
            req.login(user, function(err) {
                if (err) {
                    console.log(err);
                    res.render('500');
                } else {
                    req.flash('success', "谢谢您的注册，现在您已经自动登录了。")
                    res.redirect('/users/profile');
                }
            });

        }
    });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
    res.render('login', {title:'918diy-用户登录'});
});

/* POST login page. */
router.post('/login',
    passport.authenticate('local', { successRedirect: '/users/profile',
        failureRedirect: '/users/login',
        failureFlash: true,
        failureMessage: "Invalid username or password"})
);

/* GET login page. */
router.get('/logout', function(req, res, next) {

    req.logout();
    req.flash('success', "您现在已经登出。");
    res.redirect('/users/login');

});

/* GET login page. */
router.get('/profile', function(req, res, next) {
    console.log(req.user);
    res.render('profile', {title: "918-diy 用户资料"});
});

/* GET login page. */
router.get('/forgot', function(req, res, next) {
    router.get('/logout', function(req, res) {
        req.logout();
        req.flash('success', "您现在已经登出。");
        res.redirect('/users/login');
    });
});

module.exports = router;
