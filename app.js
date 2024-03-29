var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/about', function(req,res,next){
  redirectToIndex(req,res,next);
});
app.use('/machines', function(req,res,next){
  redirectToIndex(req,res,next);
});
app.use('/news', function(req,res,next){
  redirectToIndex(req,res,next);
});
app.use('/search', function(req,res,next){
  redirectToIndex(req,res,next);
});
app.use('/contact', function(req,res,next){
  redirectToIndex(req,res,next);
});
app.use('/', index);

//20171213 哲嘉要求，點擊搜尋引擎的任何搜尋結果都轉址到首頁。
function redirectToIndex(req, res, next) {
  if (req.query.type !== 'menu'){
    res.redirect('/index');
  }
  next();
}
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
  next(err)
});

module.exports = app;
