var express = require('express');
var router = express.Router();
var Template = require('../models/Template');
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
    Template.findOne(function(err, template) {
       if(err) {
           console.log(err);
       } else {
           res.render('board', {title: '918diy-社区', template:template});
       }
    });

});

/* GET home page. */
router.get('/list/:category', function(req, res, next) {
    Post.paginate({category:'sucai'}, 1, 10, function(error, pageCount, paginatedResults, itemCount) {
        if (error) {
            console.log(error);
            res.render('500', {title: '500'});
        } else {
            //callback(null, paginatedResults);
            res.render('bbs_list', {title: '918diy-社区', category:req.params.category, posts: paginatedResults});
        }
    }, { populate: 'created_by', sortBy : { created_on : -1 }});
    //console.log(req.params.category);

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
