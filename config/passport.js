var LocalStrategy = require('passport-local').Strategy, 
    User = require('../models/user');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
    
    passport.use('local-register', new LocalStrategy({
        usernameField: 'email', 
        passwordField: 'password', 
        passReqToCallback: true
    }, 
    (req, email, password, done) => {
        process.nextTick(() => {
            User.findOne({ 'email': email }, (err, user) => {
                if (err) return done(err);
                if (user) return done(null, false, req.flash('registerMessage', 'That email is already registered!'));
                if (password.length < 6) return done(null, false, req.flash('registerMessage', 'That password is too short!'));
                else {
                    var newUser = new User();
                    newUser.email = email;
                    newUser.password = newUser.generateHash(password);
                    newUser.firstname = req.body.firstname;
                    newUser.lastname = req.body.lastname;
                    newUser.save((err, user) => {
                        if (err) throw err;
                        return done(null, user); 
                    });
                }
            });
        });
    }));
    
    passport.use('local-signin', new LocalStrategy({
        usernameField: 'email', 
        passwordField: 'password', 
        passReqToCallback: true
    }, 
    (req, email, password, done) => {
        process.nextTick(() => {
            User.findOne({ 'email': email }, (err, user) => {
                if (err) return done(err); 
                if (!user) return done(null, false, req.flash('signinMessage', 
                    'We couldn\'t find that email address—are you sure you\'re registered?')); 
                if (!user.validPassword(password, user.password)) return done(null, false, req.flash('signinMessage', 'That password is incorrect!')); 
                return done(null, user);
            }); 
        }); 
    }));
};