var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var User = require('../models/User');
var PComment = require('../models/PComment');
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
    async.auto({
        get_news: function(callback){
            Post.paginate({}, 1, 10, function(error, pageCount, paginatedResults, itemCount) {
                if (error) {
                    callback(error);
                } else {
                    callback(null, paginatedResults);
                }
            }, { populate: 'created_by', sortBy : { created_on : -1 }});

        },
        get_sucai: function(callback){
            Post.paginate({category:'sucai'}, 1, 1, function(error, pageCount, paginatedResults, itemCount) {
                if (error) {
                    callback(error);
                } else {
                    callback(null, paginatedResults);
                }
            }, { populate: 'created_by', sortBy : { created_on : -1 }});

        },
        get_jiaoliu: function(callback){
            Post.paginate({category:'jiaoliu'}, 1, 1, function(error, pageCount, paginatedResults, itemCount) {
                if (error) {
                    callback(error);
                } else {
                    callback(null, paginatedResults);
                }
            }, { populate: 'created_by', sortBy : { created_on : -1 }});
        },
        get_gouda: function(callback){
            Post.paginate({category:'gouda'}, 1, 1, function(error, pageCount, paginatedResults, itemCount) {
                if (error) {
                    callback(error);
                } else {
                    callback(null, paginatedResults);
                }
            }, { populate: 'created_by', sortBy : { created_on : -1 }});
        },
        get_users: function(callback){
            User.paginate({}, 1, 9, function(error, pageCount, paginatedResults, itemCount) {
                if (error) {
                    callback(error);
                } else {
                    callback(null, paginatedResults);
                }
            }, {  sortBy : { user_rate : -1 }});
        }

    }, function(err, results) {
        if(err) {
            console.log(err);
            res.render('500', {title: '500'});
        } else {
            res.render('bbs', {title: '918diy-社区',
                                news:results.get_news,
                                sucai:results.get_sucai,
                                gouda: results.get_gouda,
                                jiaoliu:results.get_jiaoliu,
                                users: results.get_users});
        }
    });

});

/* GET home page. */
router.get('/list/:category', function(req, res, next) {
    Post.paginate({category:req.params.category}, 1, 10, function(error, pageCount, paginatedResults, itemCount) {
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

/* GET comment page. */
router.post('/comment', function(req, res, next) {
    //console.log(req.params.category);
    //res.render('bbs_new', {title: '918diy-社区', category:req.params.category});
    //res.json(req.body);
    var p = new PComment();
    p.created_by = req.body.user_id;
    p.reply_to = req.body.post_id;
    p.content = req.body.content;
    //p.category = req.body.category;
    p.save(function(err) {

        if(err) {
            console.log(err);
            res.render('500', {title:'500'});

        } else {
            req.flash('success', "回复成功。")
            res.redirect('/bbs/post/' + req.body.post_id);
        }
    });
});


/* GET post page. */
router.get('/post/:id', function(req, res, next) {
    //console.log(req.params.category);
    //Post.findById(req.params.id)
    //    .populate('created_by')
    //    .exec(function(err, post) {
    //    if(err) {
    //        console.log(err);
    //        res.render('500', {title:'500'});
    //
    //    } else {
    //        res.render('bbs_post', {title: '918diy-社区', post:post});
    //    }
    //});

    async.auto({
        get_post: function(callback){

            Post.findById(req.params.id)
                .populate('created_by')
                .exec(function(err, post) {
                    if(err) {
                        callback(error);

                    } else {
                        callback(null, post);
                    }
                });

        },
        get_comment: function(callback){
            PComment.paginate({reply_to:req.params.id}, req.query.page, 10, function(error, pageCount, paginatedResults, itemCount) {
                if (error) {
                    callback(error);
                } else {
                    callback(null, paginatedResults, req.query.page, pageCount);
                }
            }, { populate: 'created_by'});

        }


    }, function(err, results) {
        if(err) {
            console.log(err);
            res.render('500', {title: '500'});
        } else {
            //console.log('============');
            //console.log(results.get_comment[1]);
            res.render('bbs_post', {title: '918diy-社区',
                post:results.get_post,
                comments:results.get_comment[0],
                page: results.get_comment[1],
                page_count: results.get_comment[2]
            });
            //res.json(results.get_comment);
        }
    });

});

module.exports = router;
