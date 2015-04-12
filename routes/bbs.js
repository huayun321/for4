var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
    async.auto({
        get_sucai: function(callback){
            Post.paginate({category:'sucai'}, 1, 10, function(error, pageCount, paginatedResults, itemCount) {
                if (error) {
                    callback(error);
                } else {
                    callback(null, paginatedResults);
                }
            }, { sortBy : { createdOn : -1 }});

        },
        get_jiaoliu: function(callback){
            Post.paginate({category:'jiaoliu'}, 1, 10, function(error, pageCount, paginatedResults, itemCount) {
                if (error) {
                    callback(error);
                } else {
                    callback(null, paginatedResults);
                }
            }, { sortBy : { createdOn : -1 }});
        },
        get_gouda: function(callback){
            Post.paginate({category:'gouda'}, 1, 10, function(error, pageCount, paginatedResults, itemCount) {
                if (error) {
                    callback(error);
                } else {
                    callback(null, paginatedResults);
                }
            }, { sortBy : { createdOn : -1 }});
        }

    }, function(err, results) {
        if(err) {
            console.log(err);
            res.render('500', {title: '500'});
        } else {
            res.render('bbs', {title: '918diy-社区',
                                sucai:results.get_sucai,
                                gouda: results.get_gouda,
                                jiaoliu:results.get_jiaoliu});
        }
    });

});

/* GET home page. */
router.get('/list/:category', function(req, res, next) {
    console.log(req.params.category);
    res.render('bbs_list', {title: '918diy-社区', category:req.params.category});
});

/* GET home page. */
router.get('/new/:category', function(req, res, next) {
    console.log(req.params.category);
    res.render('bbs_new', {title: '918diy-社区', category:req.params.category});
});

/* GET home page. */
router.post('/new', function(req, res, next) {
    console.log(req.params.category);
    //res.render('bbs_new', {title: '918diy-社区', category:req.params.category});
    //res.json(req.body);
    var p = new Post();
    p.title = req.body.title;
    p.content = req.body.content;
    p.category = req.body.category;
    p.save(function(err) {
        if(err) {
            if(err) {
                console.log(err);
                res.render('500', {title:'500'});
            }
        } else {
            req.flash('success', "发帖成功。")
            res.redirect('/bbs/list/' + req.body.category);
        }
    });
});

module.exports = router;
