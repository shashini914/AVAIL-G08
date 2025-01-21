/**
 * Ensure that the user is authenticated before proceeding
 * If the user is not authenticated, redirect them to the login page
 * and flash an error message
 */
module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
  },
  /**
   * Ensure that the user is not authenticated before proceeding
   * If the user is authenticated, redirect them to the submit-seller page
   */
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/submit-seller');      
  }
};
