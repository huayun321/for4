var express = require('express');
var router = express.Router();
var Ruby = require('../models/Ruby');

/* GET home page. */
router.get('/', function(req, res, next) {
    Ruby.paginate({}, req.query.page, 10, function(error, pageCount, paginatedResults, itemCount) {
        if (error) {
            console.error(error);
        } else {
            console.log('Pages:', pageCount);
            console.log(paginatedResults);
            res.render('index', { title: 'Express', rubies:paginatedResults, pageCount:pageCount });
        }
    }, { sortBy : { createdOn : -1 }});

});



module.exports = router;
