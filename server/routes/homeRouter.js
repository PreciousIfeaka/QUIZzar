const express = require("express");
const { homePage } = require("../controller/homeController");
const { authenticateJWT } = require("../middleware/auth.middleware");

const homeRouter = express.Router();

homeRouter.get("/home", authenticateJWT, homePage)

module.exports = homeRouter;