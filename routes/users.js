const router = require('express').Router();
const User = require('../models/user.model');

router.route('/').get((req, res) => {
    res.render('home');
});

router.route('/register')
.get((req, res) => {
    res.render('register');
})
.post((req, res) => {
    const userName = req.body.username;
    const passWord = req.body.password;

    const newUser = new User({
        email: userName,
        password: passWord
    });

    newUser.save((err) => {
        if(!err){
            console.log('User registerd!');
            res.render('secrets');
        }
    });

});


router.route('/login')
.get((req, res) => {
    res.render('login');
})
.post((req, res) => {
    const user = req.body.username;
    const password = req.body.password;

    User.findOne({email: user}, (err, foundUser) => {
        if(err){
            console.log(err);
        } else if(foundUser) {
            if(foundUser.password === password){
                res.render('secrets');
            }
        }
    });

});


module.exports = router;