'use strict';
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
      return next();
    }
  req.flash('loginMessage', 'You Need To login');
  res.redirect('/secure/login');
}

module.exports = function (app, passport) {

    app.get('/secure/admin', isLoggedIn, function(req, res) {
        res.json({user : req.user });
    });

    // show the login form
    app.get('/secure/login', function(req, res) {
        res.json({message: req.flash('loginMessage')});
    });

    // process the login form
 app.post('/secure/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      req.flash('error', 'Usuario '+req.username+' No encontrado');
      res.json({message: req.flash('loginMessage')});
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json(user);
    });
  })(req, res, next);
});


    // show the signup form
    app.get('/secure/signup', function(req, res) {

        // pass in any flash data if it exists
        res.json({ message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/secure/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error,
        successFlash: 'Usuario Creado',
        failureFlash : true // allow flash messages
    }), function(req, res){res.json({ message: req.flash('signupMessage') });});

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/secure/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};
