const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String, // name is a string
    required: true // name is a required field
  },
  email: {
    type: String, // email is a string
    required: true // email is a required field
  },
  password: {
    type: String, // password is a string
    required: true // password is a required field
  },
  date: {
    type: Date, // date is a Date object
    default: Date.now // default value is the current date and time
  }
});

// Create a model from the schema
const User = mongoose.model('User', UserSchema);

// Export the User model
module.exports = User;
