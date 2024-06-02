const express = require('express');
const path = require('path');
const bcrypt = require("bcrypt");
const registerRouter = express.Router();

const users = [];

registerRouter.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "..", "..", "public", "register_page.html"));
});

registerRouter.post('/', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    })
    res.redirect('/login');
  } catch (err) {
    res.redirect("/register");
  }  
  console.log(users);
}) 
module.exports = registerRouter, users;