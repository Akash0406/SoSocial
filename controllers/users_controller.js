module.exports.profile = function(req, res) {
    return res.render('user_profile.ejs', {
        title: 'profile'
    })
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

}


// Sign in and create session for user
module.exports.createSession = function(req, res) {

}