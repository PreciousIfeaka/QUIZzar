const request = require("request");

let questions = [];
function generateQuestions(url) {
  return new Promise((resolve, reject) => {
    request(`${url}`, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        const results = JSON.parse(body).results;
        let number = 0;
        questions = [];
        results.forEach((data) => {
          const index = Math.floor(Math.random() * 4);

          if (index === 3) {
            data.incorrect_answers.push(data.correct_answer);
          } else { data.incorrect_answers.splice(index, 0, data.correct_answer); }
          
          questions.push({
            "number": number += 1,
            "question": data.question,
            "correct_answer": data.correct_answer,
            "options": data.incorrect_answers
          })
        });
        resolve(questions);
      }
    });
  });
}

module.exports = generateQuestions;