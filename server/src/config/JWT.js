const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const User = require("../models/userModel");
require("dotenv").config();

const requiredLogin = async (req, res, next) => {
  const token = req.cookies['access-token'];
  if (token) {
    const validateToken = await jwt.verify(token, process.env.SECRET_KEY);
    if (validateToken) {
      res.user = validateToken.id;
      next();
    } else {
      console.log("Token has expired");
      res.redirect("/user/login");
    }
  } else {
    console.log("Token not found")
    res.redirect("/user/login");
  }
}

const verifyEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (user.isVerified) {
        return next();
      } else {
        return res.send(`<p>Please check your email to verify your account</p>`);
      }
    } else {
      console.log("Email doesn't exist");
    }
  } catch(err) {
    console.log("Not It");
    console.log(err.message);
  }
}

module.exports = { requiredLogin, verifyEmail };