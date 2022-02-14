const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');
const JWTStrategy = require('passport-jwt').Strategy;
const extract = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
    secretOrKey: "codeial"
}

passport.use(new JWTStrategy(opts, function (jwtPayLoad, done) {

    User.findById(jwtPayLoad._id, function (err, user) {
        if (err) { console.log("Error in Finding User from JWT"); return; }

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })

}));

module.exports = passport;