var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goodsRouter = require('./routes/goods');
var commentsRouter = require('./routes/comments');
var homesRouter = require('./routes/home');
var aboutsRouter = require('./routes/about');
var recruitmentsRouter = require('./routes/recruitment');
var technologysRouter = require('./routes/technology');
var servicesRouter = require('./routes/service');
var adminsRouter = require('./routes/admin');
var wxUserRouter = require('./routes/wxUsers');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(function(req, res, next) {
//     if (req.cookies.userId) {
//         next();
//     } else {
//         if (req.originalUrl == '/companys/home' || req.originalUrl == '/users/login' || req.originalUrl == '/users/logout' || req.originalUrl.indexOf('goods/list') > -1) {
//             next();
//         } else {
//             res.json({
//                 status: '403',
//                 msg: '当前未登录',
//                 result: ''
//             });
//         }
//     }
// });
app.use('/', indexRouter);
app.use('/users', usersRouter,adminsRouter,wxUserRouter);
app.use('/goods', goodsRouter);
app.use('/comments', commentsRouter);
app.use('/companys', homesRouter,aboutsRouter);
app.use('/recruitments', recruitmentsRouter);
app.use('/technologys', technologysRouter);
app.use('/services', servicesRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;