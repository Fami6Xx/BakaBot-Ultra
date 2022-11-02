const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
const fs = require("fs");

const publicRouter = require('./routes/public');

const privateRouter = require('./routes/private');

const app = express();
app.set("view engine", "ejs");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));

app.use('/', publicRouter);
app.use('/private', privateRouter);

module.exports = app;
