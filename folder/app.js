const express = require('express');
const path = require('path');
const accountRouter = require('./routes/account');
/*const cookieRouter = require("cookie-parser");*/
const cookieParser = require('cookie-parser');
const app = express();
const session = require("express-session");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017', {
    dbName:'myApp',
    auth:{
        user:'root',
        password:'example',
        authdb: 'admin'
    },
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(session({
    secret: 'some-long-ass-string-here',
    cookie:{
        maxAge: 7 * 24 * 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: false
}));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use("/assets", express.static("public"))
app.use("/account", accountRouter);
app.get("/", (req, res) => res.sendFile(path.resolve("pages/index.html")))
app.use("/", (req, res) => res.sendStatus(404));

app.listen(3000);