const express = require("express");
const httpFetchQuestions = require("../controller/questionsController");
const { authenticateJWT } = require("../middleware/auth.middleware");

const questionsRouter = express.Router();

questionsRouter.get("/", authenticateJWT, httpFetchQuestions);

module.exports = questionsRouter;