'use strict';
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
      return next();
    }
  console.log('Pase por el middleware');
  req.flash('loginMessage', 'You Need To login');
  res.redirect('/login');
}

module.exports = function (app, passport) {
    app.get('/admin', isLoggedIn, function(req, res) {
        res.json({user : req.user });
    });

    // show the login form
    app.get('/login', function(req, res) {
        res.json({message: req.flash('loginMessage')});
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // show the signup form
    app.get('/signup', function(req, res) {

        // pass in any flash data if it exists
        res.json({ message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};
