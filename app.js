var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
//const flash = require('express-flash');
const session = require('express-session');
var mongoose = require('mongoose');

//const MongoStore = require('connect-mongo') (session);








var config = require('./config');


mongoose.connect(config.db, {useNewUrlParser:true});

//DB SECTION
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection.error'));
db.once('open', ()=>{
  console.log("db connected");
  
})





var indexRouter = require('./routes/index');
var workersRouter = require('./routes/workersPage');
var plumberRouter = require('./routes/plumberService');
var electricianRouter = require('./routes/electricianServices');
var gardenerRouter = require('./routes/gardenerService');
var crudPlumberRouter  = require('./routes/crudPlumber');
var crudElectricianRouter  = require('./routes/crudElectrician');
var crudGardenerRouter  = require('./routes/crudGardener');
var crudBooksRouter  = require('./routes/crudBooks');
var plumberAccountRouter = require('./routes/plumberDashboard');
var electricianAccountRouter = require('./routes/electricianDashboard');
var gardenerAccountRouter = require('./routes/gardenerDashboard');



const { MongoGridFSChunkError } = require('mongodb');
const req = require('express/lib/request');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(flash());
app.use(session({
  cookie: {maxAge:60000},
  secret: 'SECRET',
  resave: false,
  saveUninitialized: true,
}));


app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next)=>{
  console.log(req.session);
  console.log(req.user);
  next();
})
//app.use(passport.authenticate('session'));
//app.use(methodOverride('_method'))
app.use('/', indexRouter);
app.use('/workers', workersRouter);
app.use('/plumber', plumberRouter);
app.use('/electrician', electricianRouter);
app.use('/gardener', gardenerRouter);
app.use('/admin/plumber', crudPlumberRouter);
app.use('/admin/electrician', crudElectricianRouter);
app.use('/admin/gardener', crudGardenerRouter);
app.use('/admin/books', crudBooksRouter);
app.use('/worker/plumber', plumberAccountRouter);
app.use('/worker/electrician', electricianAccountRouter);
app.use('/worker/gardener', gardenerAccountRouter)

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
