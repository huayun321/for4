//for jqu
var upload = require('jquery-file-upload-middleware');
var Material = require('../models/Material');
var path = require('path');

// configure upload middleware
upload.configure({
    uploadDir: __dirname + '/uploads',
    uploadUrl: '/uploads',
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
    var mt = new Material();
    mt.tags = req.fields.tags;
    mt.url = fileInfo.url;
    mt.size = fileInfo.size;
    mt.thumbnail_url = fileInfo.thumbnailUrl;
    //console.log(upload.options.uploadDir());
    mt.delete_path = path.join(upload.options.uploadDir(), fileInfo.name);
    mt.thumbnail_delete_path = path.join(path.join(upload.options.uploadDir(), 'thumbnail'), fileInfo.name);
    //console.log(upload);
    mt.save(function(err) {
        if(err) {
            console.error(err);
        }
    });

});

upload.on('error', function (e, req, res) {
    console.log(e.message);
});

module.exports = upload;