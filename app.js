'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var mainRoute = require('./routes/index');

var app = express();
require('./config/passport')(passport); //Configuire our Passport
app.use(express.static(path.join(__dirname, './public')));
app.use(favicon('./public/favicon1.png')); //load Favicon
app.use(logger('dev'));
app.use(cookieParser('suspicious friend')); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({
    extended: true
}));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hjs');

app.use(session({
    secret: '*neverstaythe sAme1',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


app.use(mainRoute);
// routes ======================================================================
require('./routes/auth.js')(app, passport); // load our routes and pass in our app and fully configured passport
app.get('*', function(req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, '/views') }); // load the single view file (angular will handle the page changes on the front-end)
});

// Handle 404
app.use(function(req, res) {
   res.status(404).send('Not Found !!!');
});

// // Handle 500
app.use(function(error, req, res, next) {
    if (error.status === 404) {
      console.log('Soy yo eso es falso');
        res.sendFile('../views/error.html',{title: '404: File Not Found'});
    } else if(res.status === 500) {
        res.status(500);
        res.sendFile('./views/error.html',{title: '500: Internal Server Error', error: error });
    }
    next();
});

module.exports = app;
