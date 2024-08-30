const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();

const login = async(payload) => {
  const auth_token_key = process.env.AUTH_TOKEN_KEY;
  try {
    const { email, password } = payload;
    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      throw new Error("User not registered");
    }

    const matchPassword = bcrypt.compare(password, findUser.password);
    if (!matchPassword) {
      throw new Error("Incorrect user credentials");
    };

    if (!findUser.isVerified) {
      throw new Error("Not a verified user");
    }
    const access_token = jwt.sign(
      {email: findUser.email},
      auth_token_key,
      { expiresIn: process.env.AUTH_TOKEN_EXPIRY }
    );
    findUser.emailToken = access_token;
    return findUser;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

module.exports = { login }