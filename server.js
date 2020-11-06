const express = require('express');
const debug = require('debug')('app:server');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const port = 4003;

app.use(morgan('tiny'));
app.use(cookieParser());


app.get("/", (req, res) => {
    console.log(req.cookies)
    let text = 'Hi there, unknown user, to set the cookie please go to http://127.0.0.1:4003/cookie'
    if(req.cookies.name) {
        text = `Hi there, ${req.cookies.name}, to delete the cookie go to http://127.0.0.1:4003/delete`;
    }
    res.send(text);
});

app.get("/cookie", (req, res) => {
    res.cookie('name' , 'nadav',{ expires: new Date(Date.now() + 900000), httpOnly: true }).send('Cookie is set, name="nadav", go to http://127.0.0.1:4003 to see the change');
});

app.get("/delete", (req, res) => {
    res.clearCookie("name").send('Cookie is deleted, go to http://127.0.0.1:4003 to see the change');
});

const start = async () => {
    app.listen(port, () => {
        debug(`listening on port ${port}`);
    });
};

module.exports = start;
