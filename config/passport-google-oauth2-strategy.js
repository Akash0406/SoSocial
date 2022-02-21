const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
// const { exec } = require('child_process');

passport.use(new googleStrategy({
    clientID: "798445750455-i7imejnskiap2qnltiasaq01mbkqi39f.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
},

    function (accessToken, refreshToken, profile, done) {
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) {
                console.log("Error in Google Strategy", err);
                return;
            }
            console.log(profile);

            if (user) {
                return done(null, user);
            } else {
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function (err, user) {
                    if (err) { console.log("Error in Google Strategy", err); return; }
                    return done(null, user);
                });
            }
        });
    }
));


module.exports = passport;