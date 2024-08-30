const generateQuestions = require("../utils/generateQuestions");
const path = require("path");

async function httpFetchQuestions(req, res) {
  const amount = 20;
  const category = req.query.category;
  const difficulty = "medium";

  const url =`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
  generateQuestions(url).then((data) => { res.json(data) });
}

async function quizSession(req, res, next) {
  res.sendFile(path.join(__dirname, "..", "..", "client", "quiz_page.html"), (error) => {
    if (error) {
      next(error);
    }
  });
}

async function getQuizResult(req, res, next) {
  res.sendFile(path.join(__dirname, "..", "..", "client", "result_page.html"), (error) => {
    if (error) {
      next(error);
    }
  });
};

module.exports = {
  httpFetchQuestions,
  quizSession,
  getQuizResult
};