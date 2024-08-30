import generateQuestions from "../../server/utils/generateQuestions";

const nextBtn = document.querySelector(".next-btn");
const questionText = document.querySelector(".question-text");

let questionCount = 0;

const amount = 20;
const category = 9;
const difficulty = 'easy';
const url =`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;

nextBtn.onclick = async () => {
  questionText.classList.add('active');
  questionCount++;
  const questions = await generateQuestions(url);
  if (questions.length > 0) {
    showQuestion(questionCount, questions);
  } else {console.log('No available questions')}
}

 async function showQuestion (index, questions) {
  questionText.textContent = `${questions[index].number}. ${questions[index].question}`;
}
