var express = require('express');
var router = express.Router();
var formController = require('../controllers/formControllers');
var siteController = require('../controllers/siteControllers');
var userController = require('../controllers/userController');
var authController = require('../controllers/authController');
var async = require("async");
var post = require('../models/post');
var user = require('../models/user');
var passport = require('../config/passport');
var {
  catchErrors
} = require('../handlers/errorHandlers');

/* GET home page. */
router.get('/', async function (req, res, next) {
  const data = await post.find({});
  console.log(data);
  res.render('index', {
    data: data
  });
});
// user management
router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);
router.post('/register',
  userController.validateRegister,
  userController.register,
  authController.login
);

router.get('/logout', authController.logout);

// process the signup form
// router.post('/login', passport.authenticate('local-login', {
//   successRedirect: '/profile', // redirect to the secure profile section
//   failureRedirect: '/register', // redirect back to the signup page if there is an error
//   failureFlash: true // allow flash messages
// }));



/* LOGOUT ROUTER */
router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error", "You must be logged in to see this page.");
    res.redirect('/register');
  }
}

router.post('/voting', function (req, res, next) {
  console.log(req.body);
  // res.render('createForm', {
  //   title: 'Express'
  // });
});

router.get('/create', function (req, res, next) {
  res.render('createForm', {
    title: 'Express'
  });
});

router.post('/add/:id', siteController.updatePost);



router.post('/createlist', formController.createList);

router.get('/:id/:slug', siteController.questionPage);

module.exports = router;
