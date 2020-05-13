require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport')
//const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

uri = process.env.MONGODB;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const usersRoute = require('./routes/users');

app.use('/', usersRoute);


app.listen(3000, function(){
    console.log('Server listening on port 3000');
});
