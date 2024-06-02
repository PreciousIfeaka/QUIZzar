const generateQuestions = require("../model/questionsModel");

async function httpFetchQuestions(req, res) {
  const amount = 5;
  const category = 17;
  const difficulty = 'easy';

  const url =`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
  generateQuestions(url).then((data) => { res.json(data) });
}

module.exports = httpFetchQuestions;