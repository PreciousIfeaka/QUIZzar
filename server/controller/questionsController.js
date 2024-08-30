const generateQuestions = require("../utils/generateQuestions");

async function httpFetchQuestions(req, res) {
  const amount = 10;
  const category = req.query.category;
  const difficulty = 'hard';

  const url =`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
  generateQuestions(url).then((data) => { res.json(data) });
}

module.exports = httpFetchQuestions;