const router = require('express').Router();
const User = require('../models/user.model');
const session = require('express-session');
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose');

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

    User.register({username: req.body.username}, req.body.password, function(err, user){
        if (err){
            console.log(err);
            res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, function(){ //callback only triggerd if the authentication success(setup a cookie)
                res.redirect('/secrets')
            });
        };
    });

});

///////// SECRETS /////////
router.route('/secrets').get((req, res) => {
    if(req.isAuthenticated()){
        res.render('secrets');
    } else {
        res.redirect('/login');
    }
});

///////////////////  LOGIN  /////////////
router.route('/login')
.get((req, res) => {
    res.render('login');
})
.post((req, res) => {
    
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, (err) => {
        if (err){
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secrets");
            });
        }
    });

});

router.route('/logout').get((req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;