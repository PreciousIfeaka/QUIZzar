const express = require('express');
const path = require('path');
const loginRouter = express.Router();
const users = require("./registerRouter")


loginRouter.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "..", "..", "public", "login_page.html"));
})

loginRouter.post('/', (req, res) => {
  if (req.body.email === null || req.body.password === null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    console.log(req.body.email, req.body.password);
    console.log("Verified user");
    res.redirect("/home");
  } catch {
    res.status(500).send();
  }
})

module.exports = loginRouter;