const User = require("../models/userModel");

const isLogedin = (req, res, next) => {
  try{
    if (req.isAuthenticated() || req.user || req.session.isAuth) {
      return next();
    } else {
      res.redirect('/');
    }
  } catch(err) {
    console.log(err.message);
  }
}
const isLogOut = async(req, res, next) => {
  try {
    if (req.session.isAuth || req.isAuthenticated()) {
      return res.redirect("/home");
    } else {}
    next();
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  isLogedin, isLogOut
}