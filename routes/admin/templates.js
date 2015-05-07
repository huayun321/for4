var express = require('express');
var router = express.Router();
var Template = require('../../models/Template');

/* GET templates list page. */
router.get('/list', function(req, res, next) {
    Template.find({}).exec(function(err, templates) {
        if (err) {
            console.log("db error in GET /templates: " + err);
            res.render('500');
        } else {
            res.render('admin/templates/list', {title:'模板列表', templates: templates});
        }
    });

});

/* POST templates add page. */
router.get('/add', function(req, res, next) {
    res.render('admin/templates/add', { title: '模板添加' });
});

/* GET templates add page. */
router.post('/add', function(req, res, next) {
    //console.log(req.body);
    //res.json(req.body);
    Template.create(req.body, function(err, template) {
        if (err) {
            console.log("db error in template /posts: " + err);
            res.render('500');
        } else {
            //req.flash('success', 'A new template was created');
            res.redirect('/admin/templates/list');
        }
    });
    //res.render('admin/templates/add', { title: '模板添加' });
});


/* DELETE templates   */
router.get('/delete/:id', function(req, res) {
    Template.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log("db save error in DELETE /template/" + req.params.id + ": " + err);
            res.render('500');
        } else {
            //req.flash('success', 'template deleted');
            res.redirect('/admin/templates/list');
        }
    });
});

module.exports = router;
