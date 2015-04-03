//for jqu
var upload = require('jquery-file-upload-middleware');
var Ruby = require('../models/Ruby');
var path = require('path');

// configure upload middleware
upload.configure({
    uploadDir: __dirname + '/rubies',
    uploadUrl: '/rubies',
    imageVersions: {
        thumbnail: {
            width: 80,
            height: 80
        }
    }
});



upload.on('end', function (fileInfo, req, res) {
    //check tags
    if(req.fields.tags.trim() == '') {
        req.fields.tags = null;
    } else {
        req.fields.tags = req.fields.tags.trim().split(/\s+/);
        var tags = [];
        req.fields.tags.forEach(function(tag) {
            if(tag.length <= 20) {
                tags.push(tag);
            }

        });
        if(tags.length >= 1) {
            req.fields.tags = tags;
        } else {
            req.fields.tags = null;
        }

    }
    console.log(fileInfo);
    var rb = new Ruby();
    rb.tags = req.fields.tags;
    rb.tname = req.fields.tname;
    rb.url = fileInfo.url;
    rb.size = fileInfo.size;
    rb.thumbnail_url = fileInfo.thumbnailUrl;
    //console.log(upload.options.uploadDir());
    rb.delete_path = path.join(upload.options.uploadDir(), fileInfo.name);
    rb.thumbnail_delete_path = path.join(path.join(upload.options.uploadDir(), 'thumbnail'), fileInfo.name);
    //console.log(upload);
    rb.save(function(err) {
        if(err) {
            console.error(err);
        }
    });

});

upload.on('error', function (e, req, res) {
    console.log(e.message);
});

module.exports = upload;