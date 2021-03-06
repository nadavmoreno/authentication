const passport = require('passport');
const {MongoClient, ObjectID} = require('mongodb');
const {Strategy} = require('passport-local');
const debug = require('debug')('app:local');
const User = require('../../schemas/UserSchema')


function localStrategy() {
    passport.use(new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        }, (username, password, done) => {
            const url = 'mongodb://localhost:27017';
            const dbName = 'freelanceApp';
            (async () => {
                let client;
                try {
                    // client = await MongoClient.connect(url);
                    // const db = client.db(dbName);
                    // const col = db.collection('users');

                    // const user = await col.findOne({username});

                    const user = await User.collection.findOne({username})
                    if (user.password === password) {
                        done(null, user)
                    } else {
                        done(null, false)
                    }
                } catch (err) {
                    debug(err.stack);
                }
                // client.close();
            })();
        }))
}

module.exports = localStrategy