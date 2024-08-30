const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const log = require("../utils/logger");
const jwt = require("jsonwebtoken");
const transporter = require("../utils/mail");
require("dotenv").config();


const register = async (payload) => {
  const auth_token = process.env.AUTH_TOKEN_KEY;
  try {
    const { name, email, password } = payload;

    const existsUser = await User.findOne({email: email});
    if (existsUser) {
      throw new Error("Already registered user.");
    }

    const user = new User({
      name,
      email,
      password,
      isVerified: false,
    });

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;

    const access_token = jwt.sign(
      {email: user.email},
      auth_token,
      {
        expiresIn: process.env.AUTH_TOKEN_EXPIRY
      },
    );
    user.emailToken = access_token;
    const newUser = await user.save();

    if (!newUser) {
      throw new Error("Could not save user");
    }
    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
}

const sendEmail = async (req, email) => {
  const user = await User.findOne({email: email});

  if (!user) {
    throw new Error("user not found");
  };

  const mailData = {
    form: '"Precious Enuagwune" <preciousifeaka@gmail.com>',
    to: email,
    subject: "Email Verification",
    html: `<h2>${user.name}! Thanks for registering on QUIZzar.</h2>
          <h4>Verify your email to continue...</h4>
          <a href="http://${req.headers.host}/auth/verify-email?token=${user.emailToken}"> Verify your email </a>
        `
  };

  transporter.sendMail(mailData, async (error, info) => {
    if (error) {
      throw new Error(error.message);
    } else {
      log.info("Email sent successfully");
    }
  });
}

const verifyEmail = async (email) => {
  const user = await User.findOne({email: email});
  if (user) {
    user.emailToken = null,
    user.isVerified = true;
    await user.save();

    return user;
  } else {
    await User.deleteOne({email: user.email});
    log.info("User email is not verified");
  }
};

module.exports = {
  register, sendEmail, verifyEmail
};