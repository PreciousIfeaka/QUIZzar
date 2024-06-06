const User = require("../models/userModel");

const isLogin = async(req, res, next) => {
  try {
    if (req.session.userId) {}
    else {
      return res.redirect("/")
    }
    next();
  } catch (error) {
    console.log("AGAIN");
    console.log(error.message);
  }
}

const isLogout = async(req, res, next) => {
  try {
    if (req.session.userId) {
      return res.redirect("/home");
    } else {}
    next();
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  isLogin, isLogout
}