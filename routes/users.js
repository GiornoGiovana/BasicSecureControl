const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt'); //HASH FUNCTION WITH SALT ROUNDS
const saltRounds = 10;

////////////////////(ROOT PAGE (/)) ///////////////////
router.route('/').get((req, res) => {
    res.render('home');
});

///////////////// REGISTER //////
router.route('/register')
.get((req, res) => {
    res.render('register');
})
.post((req, res) => {
    const userName = req.body.username;
    const passWord = req.body.password;

    bcrypt.hash(passWord, saltRounds, function(err, hash) {
        
        const newUser = new User({
            email: userName,
            password: hash
        });
        newUser.save((err) => {
            if(!err){
                console.log('User registerd!');
                res.render('secrets');
            }
        });

    });

});

///////////////////  LOGIN  /////////////
router.route('/login')
.get((req, res) => {
    res.render('login');
})
.post((req, res) => {
    const user = req.body.username;
    const password = (req.body.password);

    User.findOne({email: user}, (err, foundUser) => {
        if(err){
            console.log(err);
        } else if(foundUser) {
            bcrypt.compare(password, foundUser.password, function(err, result) {
                if (result){
                    res.render('secrets');
                }
            });
        }
    });
});


module.exports = router;