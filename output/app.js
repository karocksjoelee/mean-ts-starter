"use strict";
exports.__esModule = true;
// import * as createError from 'http-errors';
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var path = require("path");
var createError = require('http-errors');
// const express = require('express');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'public')); // Server Side Render Engine
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../dist/mean-ts-starter'))); // Point to Angular App's folder
app.use('/', indexRouter);
app.use('/api/user', usersRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.status(404).send({
        status: 404,
        name: 'Route Not Found',
        message: "Route " + req.url + " not found , please check your application"
    });
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    // TODO Check this
    res.status(err.status || 500);
    res.send('error');
});
module.exports = app;
