var express = require('express');
var router = express.Router();
var Ruby = require('../../models/Ruby');
var fs = require('fs');

/* GET home page. */
router.get('/list', function(req, res, next) {
    Ruby.find(function(err, result) {
        if(err) {
            console.log(err);
            res.render('error', {message:'something go wrong', error:err});
        } else {
            res.render('admin/rubies/list', { title: '918-已加精列表列表', rubies:result });
        }
    })
});

/* GET rubies add page. */
router.get('/add', function(req, res, next) {
    //console.log(req.user);
    res.render('admin/rubies/add', { title: '918-宝石添加' });
});

/* GET materials list page. */
router.get('/delete/:id', function(req, res, next) {
    Ruby.findById(req.params.id, function(err, result) {
        if(err) {
            console.log(err);
            res.render('error', {message:'something go wrong', error:err});
        } else {
            if(result) {
                result.remove(function(err) {
                    if(err) {
                        console.log(err);
                        res.render('error', {message:'something go wrong', error:err});
                    } else {
                        fs.unlink(result.delete_path, function(err) {
                            if(err) {
                                console.log(err);
                                res.render('error', {message:'something go wrong', error:err});
                            } else {
                                fs.unlink(result.thumbnail_delete_path, function(err) {
                                    if(err) {
                                        console.log(err);
                                        res.render('error', {message:'something go wrong', error:err});
                                    } else {
                                        res.redirect('/admin/rubies/list');
                                    }
                                });
                            }
                        });
                    }
                });
            } else {
                res.redirect('/admin/rubies/list');
            }


        }
    })

});

module.exports = router;
