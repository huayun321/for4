var express = require('express');
var router = express.Router();
var Post = require('../models/Post');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('bbs', {title: '918diy-社区'});
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
