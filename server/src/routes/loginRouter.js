const express = require('express');
const path = require('path');
const loginRouter = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isLogOut } = require("../config/auth");
const verifyEmail = require('../config/JWT');
require('dotenv').config();


loginRouter.get('/login', isLogOut, async (req, res) => {
  await res.sendFile(path.join(__dirname, "..", "..", "..", "client", "login_page.html"));
});

loginRouter.post('/login', verifyEmail, async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email: email });

    if(findUser) {
      const match = await bcrypt.compare(password, findUser.password);
      if (match) {
        req.session.isAuth = true;
        console.log("Correct");
        return res.redirect("/home");
      } else {
        console.log("Invalid Password");
        return res.redirect("/user/login");
      }
    } else {
      console.log("User is not registered");
    };
  } catch (err) {
    console.log(err);
  }
})

module.exports = loginRouter;