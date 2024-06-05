const express = require("express");
const path = require('path');
const { requiredLogin } = require("../config/JWT");

const homeRouter = express.Router();

homeRouter.get("/", requiredLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "public", "home_page.html"));
});

module.exports = homeRouter;