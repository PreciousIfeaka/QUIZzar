const express = require("express");
const httpFetchQuestions = require("../../controller/questionsController");

const questionsRouter = express.Router();

questionsRouter.get("/", httpFetchQuestions);

module.exports = questionsRouter;