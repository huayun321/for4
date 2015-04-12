var express = require('express');
var router = express.Router();
var User = require('../models/User');
var passport = require('passport');
var mailer = require('../mailer');


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
                    res.redirect('/users/:' + user.id);
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
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        console.log(user);
        console.log('===11111');
        if (err) {
            res.render('500', {title:'500'});
            return next(err); }
        if (!user) {
            console.log('===222222');
            console.log('why' + !user);
            req.flash('error', "用户不存在。");
            return res.redirect('/login');
        }
        req.logIn(user, function(err) {
            if (err) {
                req.flash('error', "密码错误。");
                return res.redirect('/login');
            }
            return res.redirect('/users/' + user.id);
        });
    })(req, res, next);
});

/* GET logout page. */
router.get('/logout', function(req, res, next) {

    req.logout();
    req.flash('success', "您现在已经登出。");
    res.redirect('/users/login');

});

/* GET forgot page. */
router.get('/forgot', function(req, res, next) {
    res.render('forgot', {title:'918diy-忘记密码'});
});

/* POST forgot page. */
router.post('/forgot', function(req, res, next) {
    User.findOne({email:req.body.email}, function(err,user) {
        if(err) {
            console.log(err);
            res.render('500', {title:'500'});
        }
        if(!user) {
            req.flash('error', "邮箱地址不存在。");
            res.redirect('/users/forgot');
        } else {
            mailer.send(user.email, user.password, function(err, msg) {
                if(err) {
                    console.log(err);
                } else {
                    console.log(msg);
                }
            });

            req.flash('success', "包含密码的邮件已发送，请注意查收。");
            res.redirect('/users/forgot');
        }
    });

});



/* GET profile index page. */
router.get('/:id', function(req, res, next) {
    //res.json(req.params.id);
    User.findById(req.params.id, function(err, user) {
        if(err) {
            console.log(err);
            res.render('500', {title:'500'});
        }
        if(!user) {
            req.flash('error', "用户不存在。");
            res.redirect('/users/login');
        } else {
            res.render('user', {title: "918-diy 用户资料", muser:user});
        }
    });
});

/* GET profile  page. */
router.get('/:id/profile', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if(err) {
            console.log(err);
            res.render('500', {title:'500'});
        }
        if(!user) {
            req.flash('error', "用户不存在。");
            res.redirect('/users/login');
        } else {
            res.render('user_profile', {title: "918-diy 用户资料", muser:user});
        }
    });

});

/* GET rubies  page. */
router.get('/rubies', function(req, res, next) {
    console.log(req.user);
    res.render('user_rubies', {title: "918-diy 用户宝石"});
});

/* GET likes  page. */
router.get('/likes', function(req, res, next) {
    console.log(req.user);
    res.render('user_likes', {title: "918-diy 用户收藏"});
});

module.exports = router;

//登录登出已完成
//todo url 权限认证
//用户资料的更改
//头像上传
//bbs部分
//瀑布流部分 先弄分页 然后瀑布刘
