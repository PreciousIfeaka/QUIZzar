const express = require('express');
const path = require('path');
const bcrypt = require("bcrypt");
const registerRouter = express.Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require('crypto');
require("dotenv").config();

registerRouter.get('/register', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "..", "..", "public", "register_page.html"));
});

// create a transport media using nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "preciousifeaka@gmail.com",
    pass: process.env.PASS_WORD,
  },
  tls: {
    rejectUnauthorized: false
  }
})

registerRouter.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = new User({
      name,
      email,
      password,
      emailToken: crypto.randomBytes(64).toString('hex'),
      isVerified: false,
    });

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
    const newUser = await user.save();

    // send verification email to the entered useremil after

    var mailData = {
      form: '"Precious Enuagwune" <preciousifeaka@gmail.com>',
      to: user.email,
      subject: "Email Verification",
      html: `<h2>${user.name}! Thanks for registering on QUIZzar.</h2>
            <h4>Verify your email to continue...</h4>
            <a href="http://${req.headers.host}/user/verify-email?token=${user.emailToken}"> Verify your email </a>
          `
    }

    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Verification email sent");
      }
    });
    res.send(`<h3>Please, check your email to verify your account</h3>`);
    // res.redirect('/user/login');
  } catch (err) {
    console.log(err);
    res.redirect("/user/register");
  }
});

registerRouter.get("/verify-email", async (req, res) => {
  try {
    const token = req.query.token;
    const user = await User.findOne({ emailToken: token });

    if (user) {
      user.emailToken = null,
      user.isVerified = true;
      await user.save();
      res.redirect("/user/verified");
    } else {
      res.redirect("/user/register");
      console.log("User email is not verified");
    }
  } catch(err) {
    console.log(err);
  }
});

registerRouter.get("/verified", async (req, res) => {
  res.send(`<h3>Your email has been verified. You can now proceed to the <a href="/user/login">login page</a></h3>`);
})

module.exports = registerRouter;