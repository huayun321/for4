var express = require('express');
var router = express.Router();
var Ruby = require('../models/Ruby');
var RComment = require('../models/RComment');

/* GET home page. */
router.get('/', function(req, res, next) {
    Ruby.paginate({}, req.query.page, 10, function(error, pageCount, paginatedResults, itemCount) {
        if (error) {
            console.error(error);
        } else {
            //console.log('Pages:', pageCount);
            //console.log(paginatedResults);
            res.render('index', { title: 'Express', rubies:paginatedResults, pageCount:pageCount });
        }
    }, { sortBy : { createdOn : -1 }});

});

/* GET home page. */
router.get('/rcomment/:r_id', function(req, res, next) {
    RComment.paginate({reply_to:req.params.r_id}, req.query.page, 10, function(error, pageCount, paginatedResults, itemCount) {
        if (error) {
            console.error(error);
        } else {
            //console.log('Pages:', pageCount);
            //console.log(paginatedResults);
            res.json({rcomments:paginatedResults, page:req.query.page, pageCount:pageCount});
        }
    }, { populate: 'created_by', sortBy : { createdOn : -1 }});

});

/* GET home page. */
router.post('/rcoment', function(req, res, next) {
    var r = new RComment();
    r.created_by = req.body.user_id;
    r.reply_to = req.body.ruby_id;
    r.content = req.body.content;
    //p.category = req.body.category;
    r.save(function(err, rc) {

        if(err) {
            console.log(err);
            res.json('ajax err rcomment');

        } else {
            res.json(rc);
        }
    });


});



module.exports = router;
