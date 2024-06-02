const express = require("express");
const path = require('path');

const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "public", "home_page.html"));
})

module.exports = homeRouter;