var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
//for jqu
var upload = require('jquery-file-upload-middleware');

var app = express();

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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
//jqu
app.use('/upload', upload.fileHandler());
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
    console.log(req.param('user_id'));
    console.log(req.body);
});
//upload.on('delete', function (fileInfo, req, res) { ... });
upload.on('error', function (e, req, res) {
    console.log(e.message);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
