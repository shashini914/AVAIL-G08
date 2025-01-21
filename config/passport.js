const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../UserModels/User');

// Exported function that configures passport for authentication
module.exports = function(passport) {
  // Use the LocalStrategy for passport
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          // If email not registered, return done with a false value and a message
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            // If password matches, return done with the user
            return done(null, user);
          } else {
            // If password does not match, return done with a false value and a message
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  // Serialize the user to store in the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Deserialize the user from the session
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
