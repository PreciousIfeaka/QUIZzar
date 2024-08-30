const express = require("express");
const {httpFetchQuestions, quizSession, getQuizResult} = require("../controller/questionsController");
const { authenticateJWT } = require("../middleware/auth.middleware");

const questionsRouter = express.Router();

questionsRouter.get("/", authenticateJWT, quizSession);
questionsRouter.get("/api", authenticateJWT, httpFetchQuestions);
questionsRouter.get("/result", authenticateJWT, getQuizResult);

module.exports = questionsRouter;