const passport = require('passport');
const session = require('express-session');

require('./strategies/local.strategy')();

function passportConfig(app) {
    app.use(session({
        secret: 'asdd asd',
        cookie : {
            maxAge: 1000* 60 * 60 *24 * 365
        },
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

}

module.exports = passportConfig
