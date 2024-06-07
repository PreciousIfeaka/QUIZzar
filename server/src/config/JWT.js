const User = require("../models/userModel");
require("dotenv").config();


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
    console.log(err.message);
  }
}

module.exports = verifyEmail;