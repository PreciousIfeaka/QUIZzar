const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  googleId: {
    type: String
  },

  password: {
    type: String,
    required: false
  },

  emailToken: {
    type: String,
  },

  isVerified: {
    type: Boolean,
  },

  date: {
    type: Date,
    default: Date.now() 
  }
});

module.exports = mongoose.model("User", userSchema);