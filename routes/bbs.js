var express = require('express');
var router = express.Router();
var Ruby = require('../models/Ruby');

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
    res.render('bbs_new', {title: '918diy-社区'});
});

module.exports = router;
