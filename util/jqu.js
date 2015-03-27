//for jqu
var upload = require('jquery-file-upload-middleware');

// configure upload middleware
upload.configure({
    uploadDir: __dirname + '/public/uploads',
    uploadUrl: '/uploads',
    imageVersions: {
        thumbnail: {
            width: 80,
            height: 80
        }
    }
});

// events
upload.on('begin', function (fileInfo, req, res) {
    // fileInfo structure is the same as returned to browser
    // {
    //     name: '3 (3).jpg',
    //     originalName: '3.jpg',
    //     size: 79262,
    //     type: 'image/jpeg',
    //     delete_type: 'DELETE',
    //     delete_url: 'http://yourhost/upload/3%20(3).jpg',
    //     url: 'http://yourhost/uploads/3%20(3).jpg',
    //     thumbnail_url: 'http://youhost/uploads/thumbnail/3%20(3).jpg'
    // }
    console.log(fileInfo);
    console.log(req.fields.user_id);
    console.log(req.params.script);
    //console.log(req);

});
//upload.on('abort', function (fileInfo, req, res) { ... });
upload.on('end', function (fileInfo, req, res) {
    console.log(fileInfo);
    console.log(req.params.user_id);
    console.log(req.body);
});
//upload.on('delete', function (fileInfo, req, res) { ... });
upload.on('error', function (e, req, res) {
    console.log(e.message);
});

module.exports = upload;