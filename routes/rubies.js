var express = require('express');
var router = express.Router();
var Template = require('../models/Template');
var async = require('async');


/* GET home page. */
router.get('/', function(req, res, next) {

    async.auto({
        get_circle: function(callback){

            Template.find({shape:'circle'}, function(err, results) {
                if(err) {
                    callback(err);
                } else {
                    callback(null, results);
                }
            });

        },
        get_ellipse: function(callback){
            Template.find({shape:'ellipse'}, function(err, results) {
                if(err) {
                    callback(err);
                } else {
                    callback(null, results);
                }
            });

        },
        get_rect: function(callback){
            Template.find({shape:'rect'}, function(err, results) {
                if(err) {
                    callback(err);
                } else {
                    callback(null, results);
                }
            });
        },
        get_heart: function(callback){
            Template.find({shape:'heart'}, function(err, results) {
                if(err) {
                    callback(err);
                } else {
                    callback(null, results);
                }
            });
        }

    }, function(err, results) {
        if(err) {
            console.log(err);
            res.render('500', {title: '500'});
        } else {
            res.render('ruby', {title: '918diy-社区',
                circle:results.get_circle,
                ellipse:results.get_ellipse,
                rect: results.get_rect,
                heart:results.get_heart});
        }
    });

});

/* GET home page. */
router.get('/template/:id', function(req, res, next) {
    Template.findById(req.params.id)
        .exec(function(err, tpl) {
            if(err) {
                console.log(err);
                res.render('500', {title:'500'});

            } else {
                res.render('ruby_board', {title:'918diy-社区', tpl:tpl});
            }
        });

});

/* GET home page. */
router.get('/new/:category', function(req, res, next) {
    //console.log(req.params.category);
    res.render('bbs_new', {title: '918diy-社区', category:req.params.category});
});

/* GET home page. */
router.post('/new', function(req, res, next) {
    //console.log(req.params.category);
    //res.render('bbs_new', {title: '918diy-社区', category:req.params.category});
    //res.json(req.body);
    var p = new Post();
    p.created_by = req.body.id;
    p.title = req.body.title;
    p.content = req.body.content;
    p.category = req.body.category;
    p.save(function(err) {

        if(err) {
            console.log(err);
            res.render('500', {title:'500'});

        } else {
            req.flash('success', "发帖成功。")
            res.redirect('/bbs/list/' + req.body.category);
        }
    });
});


/* GET post page. */
router.get('/post/:id', function(req, res, next) {
    //console.log(req.params.category);
    Post.findById(req.params.id)
        .populate('created_by')
        .exec(function(err, post) {
        if(err) {
            console.log(err);
            res.render('500', {title:'500'});

        } else {
            res.render('bbs_post', {title: '918diy-社区', post:post});
        }
    });

});

module.exports = router;
