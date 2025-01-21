const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../UserModels/User');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
// Use the forwardAuthenticated middleware to redirect authenticated users
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
// Use the forwardAuthenticated middleware to redirect authenticated users
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register 
router.post('/register', (req, res) => {
  // Destructure the request body
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check if any of the fields are empty
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  // Check if passwords match
  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  // Check if the password is at least 6 characters
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  // If there are errors, render the register view and pass the errors, name, email, password, and password2 as locals
  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    // Check if the email is already in use
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        // Create a new user
        const newUser = new User({
          name,
          email,
          password
        });

        // Hash the password and save the user
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});


// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/submit-seller',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are submit-seller out');
  res.redirect('/users/login');
});

module.exports = router;
