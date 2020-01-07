require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');

//passport 
var passport = require('passport');
//
var session = require('express-session');
var logger = require('morgan');
var engine = require('ejs-mate');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var productRouter = require('./routes/product');
var app = express();

// view engine setup
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//passport
require('./config/passport')(passport);

app.use(logger('dev'));
app.use(express.json());
app.use(session({
  secret: 'ahihi',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 3600 *24
  }
}))
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('upload'))
app.use(cookieParser());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

const Category = require("./models/category");
const User = require('./models/User');
app.use(async(req, res, next)=> {
  //category
  const cate = await Category.all();
  req.session.cate = cate;
  res.locals.cate = req.session.cate;
  //watch list 
  res.locals.list = req.session.list;
  //Authentication
  if (req.isAuthenticated()){
    const result = await User.loadmylist(req.user.id)
    req.session.list=[];
    req.session.list = result;
    res.locals.list = req.session.list;
    res.locals.user = req.user;
    res.locals.authenticated = ! req.user.anonymous;
  }
  next();
});

app.use('/', indexRouter); //localhost/
app.use('/user',usersRouter);
app.use('/admin', adminRouter);
app.use('/product', productRouter);

//

// catch 404 and forward to error handler
app.use(function(req,res){
  res.status(404).render('part_layout/notfound');
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;