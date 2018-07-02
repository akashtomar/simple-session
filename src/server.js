const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const routes = require('../routes');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "SecretKey",
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