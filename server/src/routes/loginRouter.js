const express = require('express');
const path = require('path');
const loginRouter = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const { verifyEmail } = require('../config/JWT');
require('dotenv').config();


loginRouter.get('/login', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "..", "..", "public", "login_page.html"));
});

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY);
}

loginRouter.post('/login', verifyEmail, async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email: email });

    if(findUser) {
      const match = await bcrypt.compare(password, findUser.password);
      if (match) {
        // create token
        const token = createToken(findUser.id);

        // store token in  cookie
        res.cookie('access-token', token);
        console.log("Valid User");
        res.redirect("/home");
      } else { console.log("Invalid Password") };
    } else {console.log("User is not registered")};
  } catch (err) {
    console.log(err);
  }
})

module.exports = loginRouter;