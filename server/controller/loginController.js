const { login } = require("../service/login.service");
const path = require('path');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signin = async (req, res) => {
  payload = req.body;

  if (!payload) {
    return res.status(422).json({
      status: "failed",
      message: "Could not get user data input"
    });
  }
  const loggedinUser = await login(payload);

  if(!loggedinUser) {
    return res.status(403).json({
      message: "Login not successful. Go back to the registration page."
    });
  }

  const token = jwt.sign(payload, process.env.AUTH_TOKEN_KEY, { expiresIn: process.env.AUTH_TOKEN_EXPIRY });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7200000
  });
  res.redirect("/home");
};

const signinPage = async (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "client", "login_page.html"));
};

module.exports = { signin, signinPage };