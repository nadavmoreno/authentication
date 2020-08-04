const express = require('express');
const debug = require('debug')('app:memberRoutes');

const memberRouter = express.Router();

function router() {

    memberRouter.use((req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/');
        }
    });

    memberRouter.route('/')
        .get((req, res) => {
            (async () => {
                try {
                    res.render('pages/member', {
                        pageTitle: 'Member',
                        userName: req.user ? req.user.username : null,
                    });
                } catch (err) {
                    debug(err.stack);
                }
            })();
        });

    return memberRouter;
}

module.exports = router;
