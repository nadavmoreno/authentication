const express = require('express');
const passport = require('passport');
const debug = require('debug')('app:authRoutes');
const User = require('../schemas/UserSchema');

const authRouter = express.Router();

function router() {
    authRouter.route('/add-user')
        .post((req, res) => {
            const user = {
                username: req.body.username,
                password: req.body.password,
            };
            (async () => {
                try {
                    const newUser = new User(user);
                    const results = await newUser.save();

                    req.login(results, () => {
                        var fullUrl = req.protocol + '://' + req.get('host') + '/member';

                        res.json({
                            "loggedIn": true,
                            "redirectTo": fullUrl
                        })
                    });
                } catch (err) {
                    res.json(err);
                }
            })();
        });

    authRouter.route('/authenticate').post(passport.authenticate('local', {
        successRedirect: '/member',
        failureRedirect: '/',
    }));

    authRouter.route('/logout')
        .get((req, res) => {
                req.logout();
                res.redirect('/');
            }
        );

    return authRouter;
}

module.exports = router;
