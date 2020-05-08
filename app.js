require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

uri = "mongodb+srv://admin-sergio:jefrazam123@cluster0-l6gvi.mongodb.net/usersDB"
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const usersRoute = require('./routes/users');

app.use('/', usersRoute);
console.log(process.env.SECRET);

app.listen(3000, function(){
    console.log('Server listening on port 3000');
});
