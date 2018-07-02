const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const routes = require('../routes');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "SecretKey",
    store: new MongoStore({
        url: process.env.DB_URL,
        ttl: 10 * 60 * 60
    }),
    resave: false,
    saveUninitialized: true
}));

app.use('/',routes);

//error handler
app.use((err,req,res,next)=>{
    if(err.type == 'session'){
        return res.redirect('/');
    }

    res.send(err.message);

});

module.exports = app;