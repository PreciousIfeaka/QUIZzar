const path = require('path');
const log = require("../utils/logger");
const jsonwebtoken = require("jsonwebtoken");
const { register, sendEmail, verifyEmail } = require("../service/register.service");
require("dotenv").config();

const httpRegister = async (req, res) => {
  const payload = req.body;
  if (!payload) {
    res.status(422).json({
      status: "failed",
      message: "Could not get user data input"
    });
  }
  const savedUser = await register(payload);

  if(!savedUser) {
    throw new Error("Could not save user");
  }
  await sendEmail(req, payload.email);

  res.send("A confirmation email has been sent to your mail. Click the link in the email to proceed.");
}

const registerPage = async (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "client", "register_page.html"));
};

const smtpVerifyEmail = async(req, res) => {
  const auth_token_key = process.env.AUTH_TOKEN_KEY;
  const emailToken = req.query.token;
  const user = jsonwebtoken.verify(emailToken, auth_token_key);
  const verifiedUser = await verifyEmail(user.email);

  if (!verifiedUser) {
    return res.status(403).json({
      message: "Unauthenticated user. Go back to the registration page."
    });
  };

  res.redirect("/auth/login");
}

module.exports = {
  httpRegister,
  registerPage,
  smtpVerifyEmail,
}