const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app:server');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = 4003;

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: 'nm'}));
require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, '/public/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const authRouter = require('./src/routes/authRoutes')();
const memberRouter = require('./src/routes/memberRoutes')();

app.use('/auth', authRouter);
app.use('/member', memberRouter);

app.get('/', (req, res) => {
    res.render('pages/login', {
        pageTitle: 'Login',
        userName: req.user ? req.user.username : null,
    });
});

app.get('/registration', (req, res) => {
    res.render('pages/registration', {
        pageTitle: 'Registration',
        userName: req.user ? req.user.username : null,
    });
});

const start = async () => {
    await mongoose.connect(
        'mongodb://127.0.0.1/freelanceApp',
        {useNewUrlParser: true, useFindAndModify: false},
    );
    debug('Connected to db server');

    app.listen(port, () => {
        debug(`listening on port ${port}`);
    });
};

module.exports = start;
