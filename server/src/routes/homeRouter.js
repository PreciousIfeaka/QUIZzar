const express = require("express");
const path = require('path');
const { isLogedin } = require('../config/auth');

const homeRouter = express.Router();

homeRouter.get("/", isLogedin, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "..", "client", "home_page.html"));
});

module.exports = homeRouter;