const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/userM');
const consts = require('./consts');

module.exports = function(passport){
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = consts.jwtSecret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.getUserByUsername(jwt_payload.username)
            .then((user)=>{
                return done(null, user);
            })
            .catch((err)=>{
                return done(err, false);
            });
    }));
};
