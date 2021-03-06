var express = require('express');
var router = express.Router();
var Material = require('../../models/Material');
var fs = require('fs');

/* GET materials list page. */
router.get('/list', function(req, res, next) {
    Material.find(function(err, result) {
        if(err) {
            console.log(err);
            res.render('error', {message:'something go wrong', error:err});
        } else {
            res.render('admin/materials/list', { title: '918-素材列表', materials:result });
        }
    })

});
/* GET materials add page. */
router.get('/add', function(req, res, next) {
    res.render('admin/materials/add', { title: '918-素材添加' });
});

/* GET materials list page. */
router.get('/delete/:id', function(req, res, next) {
    Material.findById(req.params.id, function(err, mt) {
        if(err) {
            console.log(err);
            res.render('error', {message:'something go wrong', error:err});
        } else {
            if(mt) {
                mt.remove(function(err) {
                    if(err) {
                        console.log(err);
                        res.render('error', {message:'something go wrong', error:err});
                    } else {
                        fs.unlink(mt.delete_path, function(err) {
                            if(err) {
                                console.log(err);
                                res.render('error', {message:'something go wrong', error:err});
                            } else {
                                fs.unlink(mt.thumbnail_delete_path, function(err) {
                                    if(err) {
                                        console.log(err);
                                        res.render('error', {message:'something go wrong', error:err});
                                    } else {
                                        res.redirect('/admin/materials/list');
                                    }
                                });
                            }
                        });
                    }
                });
            } else {
                res.redirect('/admin/materials/list');
            }


        }
    })

});

module.exports = router;
