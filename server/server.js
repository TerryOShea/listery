'use strict';

const express = require('express'), 
      routes = require('./routes.js'),
      morgan = require('morgan'), 
      mongoose = require('mongoose'), 
      passport = require('passport'),
      bodyParser = require('body-parser'), 
      flash = require('connect-flash'), 
      session = require('express-session'), 
      favicon = require('serve-favicon');

require('dotenv').config({ silent: true });

const app = express();

// Connect to the database
mongoose.connect(process.env.MLAB_URI, (err) => {
    if (err) return console.log(err);
    else console.log("Connected to the database.");
    
    require(process.cwd() + '/config/passport')(passport);
    
    app.use(favicon(process.cwd() + '/favicon.png'));
    app.set('view engine', 'ejs');
    app.use('/views', express.static(process.cwd() + '/views'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({ secret: 'vlcqvkcwcehzbosrgmghqptbeqoeuuxxvyk', resave: false, saveUninitialized: false }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    
    routes(app, passport);
    
    // Log requests
    morgan('short');
    
    app.listen(process.env.PORT || 8000, () => {
        console.log("Listening on port 8000");
    });
})