const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
// Use the forwardAuthenticated middleware to redirect authenticated users
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
// Use the ensureAuthenticated middleware to protect the dashboard route
router.get('/submit-seller', ensureAuthenticated, (req, res) =>
  res.render('submit-seller', {
    user: req.user
  })
);

// Export the router
module.exports = router;
