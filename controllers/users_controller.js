const { redirect } = require('express/lib/response');
const User = require('../models/user');



module.exports.profile = function(req, res) {
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id, function(err, user) {
            if (user) {
                return res.render('user_profile.ejs', {
                    title: 'profile',
                    user: user
                })
            }
            return res.redirect('/users/sign-in')
        });
    } else {
        return res.redirect('/users/sign-in');
    }
    // return res.render('user_profile.ejs', {
    //     title: 'profile'
    // })
}

// render the signUp page
module.exports.signUp = function(req, res) {
    return res.render('user_sign_up', {
        title: 'Sign Up'
    })
}

// render the signIn page
module.exports.signIn = function(req, res) {
    return res.render('user_sign_In', {
        title: 'Sign In'
    })
}


// get the sign up data
module.exports.create = function(req, res) {
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect('back')
    }

    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) { console.log(`error in finding user in signing up`); return }

        if (!user) {
            User.create(req.body, function(err, user) {
                if (err) { console.log(`error in creating user while signing up`); return }

                return res.redirect('/users/sign-in');
            })
        } else {
            return res.redirect('back')
        }
    })
}


// Sign in and create session for user
module.exports.createSession = function(req, res) {
    // find the user
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) { console.log(`User does not exist`); return }

        if (user) {
            if (user.password != req.body.password) {
                return res.redirect('back');
            }

            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        } else {
            return res.redirect('back');
        }
    })
}


module.exports.signOut = function(req, res) {
    // console.log(req.cookies);
    res.cookie('user_id', "");
    return res.redirect('/users/sign-in');
}