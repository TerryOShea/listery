'use strict';

var Users = require('../models/user'), 
    Lists = require('../models/list');

module.exports = (app, passport) => {
    app.get('/', isLoggedIn, (req, res) => {
        let randTasks = ["fold laundry", "jury duty", "feed turtle", "buy lotion", "slay creature", "find keys", 
        "call Mother", "discover self", "dentist's appt.", "promulgate notion", "make. do. be.", "write list", 
        "get a job", "comb long, pearly blonde hair", "adopt stratagem", "monetize", "digitize", "capture zeitgeist", 
        "craft acerbic comeback", "make trenchant comment", "build yurt", "water ficus", "buy cabbage", "avoid void", 
        "rent miniskirt", "ford fjord", "walk dog", "stretch", "remember the thing", "balance checkbook", "appreciate nature", 
        "nurture progeny"];
        res.render('pages/index', { title: 'Home', listTitle: "list #1", entries: [randTasks[Math.floor(Math.random()*randTasks.length)]] });
    });
    
    app.post('/', mustBeLoggedIn, (req, res) => {
        //Lists.update({})
    });
    
    app.get('/login', (req, res) => {
        res.render('pages/login', { message: req.flash('loginMessage'), title: 'Log in' });
    });
    
    // fix so that others can see mylists
    app.post('/login', passport.authenticate('local-signin', {
        successRedirect: '/mylists', 
        failureRedirect: '/login', 
        failureFlash: true
    }));
    
    app.get('/signup', (req, res) => {
        res.render('pages/signup', { message: req.flash('signupMessage'), title: 'Sign up' });
    });
    
    app.post('/signup', passport.authenticate('local-register', {
        successRedirect: '/mylists', 
        failureRedirect: '/register', 
        failureFlash: true
    }));
    
    app.get('/logout', mustBeLoggedIn, (req, res) => {
        req.logout();
        res.redirect('/');
    });
    
    // fix so that others can see mylists and has unique identifier
    app.get('/mylists/', mustBeLoggedIn, (req, res) => {
        res.render('pages/mylists', { message: req.flash('mylistsMessage'), title: 'My list' });
    });
    app.get('/list/:id');
    app.post('/list/:id');
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        return next(); 
    }
    return next();
}

function mustBeLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        return next();
    }
    res.redirect('/signin');
}