var express = require('express');
//for passport
var session = require('express-session');
var flash = require('connect-flash');

var RedisStore = require('connect-redis')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/User');
//..end of passport
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
//admin routes
var admin_index = require('./routes/admin/index');
var admin_materials = require('./routes/admin/materials');
var admin_templates = require('./routes/admin/templates');
var admin_rubies = require('./routes/admin/rubies');
//for jqu
var upload = require('jquery-file-upload-middleware');
//var upload2 = require('./util/rubies_jqu');
// configuration
var resizeConf = require('./jqu_config').resizeVersion;
var dirs = require('./jqu_config').directors;

var app = express();

//connect to mongodb
require('./models/conn');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
//jqu
// jquery-file-upload helper
app.use('/upload/materials', function (req, res, next) {
    upload.fileHandler({
        //tmpDir: dirs.temp,
        uploadDir: __dirname + dirs.materials,
        uploadUrl: dirs.materials_url,
        imageVersions: resizeConf.materials
    })(req, res, next);
});
app.use('/upload/rubies', upload.fileHandler({
    //tmpDir: dirs.temp,
    uploadDir: __dirname + dirs.rubies,
    uploadUrl: dirs.rubies_url,
    imageVersions: resizeConf.rubies
}));

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
});
upload.on('abort', function (fileInfo, req, res) {});
var Material = require('./models/Material');
var Ruby = require('./models/Ruby');
var path = require('path');
upload.on('end', function (fileInfo, req, res) {
    console.log(req.fields.model);
    switch(req.fields.model) {
        case 'Material':
            //check tags
            if(String(req.fields.tags).trim() == '') {
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
            //console.log(fileInfo);/
            var mt = new Material();
            mt.tags = req.fields.tags;
            mt.url = fileInfo.url;
            mt.size = fileInfo.size;
            mt.thumbnail_url = fileInfo.thumbnailUrl;
            //console.log(upload.options.uploadDir);
            mt.delete_path = path.join(upload.options.uploadDir, fileInfo.name);
            mt.thumbnail_delete_path = path.join(path.join(upload.options.uploadDir, 'thumbnail'), fileInfo.name);
            //console.log(upload);
            mt.save(function(err) {
                if(err) {
                    console.error(err);
                }
            });
            break;
        case 'Ruby':
            //check tags
            if(String(req.fields.tags).trim() == '') {
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

            var rb = new Ruby();
            rb.tags = req.fields.tags;
            rb.tname = req.fields.tname;
            rb.url = fileInfo.url;
            rb.size = fileInfo.size;
            rb.thumbnail_url = fileInfo.thumbnailUrl;
            //console.log(upload.options.uploadDir());
            rb.delete_path = path.join(upload.options.uploadDir, fileInfo.name);
            rb.thumbnail_delete_path = path.join(path.join(upload.options.uploadDir, 'thumbnail'), fileInfo.name);
            //console.log(upload);
            rb.save(function(err) {
                if(err) {
                    console.error(err);
                }
            });
            break;
        default:
            break;
    }
});
upload.on('delete', function (fileInfo, req, res) {});
upload.on('error', function (e, req, res) {
    console.log(e.message);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    store: new RedisStore({
        host: "127.0.0.1",
        port: 6379,
        db: 2
    }),
    resave:false,
    saveUninitialized:false,
    secret: 'keyboard cat'
}));
app.use(flash());
app.use(function(req, res, next) {
    res.locals.message = req.flash();
    next();
});
app.use(passport.initialize());
app.use(passport.session());
passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
        //passReqToCallback : true
    },
    function(email, password, done) {
        User.findOne({ email: email }, function(err, user) {
            //console.log(password);
            //console.log(user.password);
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: '登录邮箱地址错误。' });
            }
            if (user.password != password) {
                return done(null, false, { message: '密码不正确。' } );
            }
            return done(null, user);
        });
    }
));
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


//for views to use user
app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});
app.use(express.static(path.join(__dirname, 'public')));

var paginate = require('express-paginate');
// keep this before all routes that will use pagination
app.use(paginate.middleware(10, 50));

app.use('/', routes);
app.use('/users', users);
//admin routes
app.use('/admin', admin_index);
app.use('/admin/materials', admin_materials);
app.use('/admin/templates', admin_templates);
app.use('/admin/rubies', admin_rubies);

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
