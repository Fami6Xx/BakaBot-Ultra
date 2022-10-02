const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");
const session = require("express-session");

const publicRouter = require('./routes/public');
publicRouter.use(express.static(path.join(__dirname, "public")));

const privateRouter = require('./routes/private');
privateRouter.use(express.static(path.join(__dirname, "private")));

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
