var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

/**
 *  mongo connection
 */
const DB = require("./modules/db");
const usuario = process.env.MONGO_INITDB_ROOT_USERNAME
const clave = process.env.MONGO_INITDB_ROOT_PASSWORD
const svc = "mongo"

let db = new DB('conFusion',usuario,clave,svc);
const connect = db.conectar()

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err)});



const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);


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
