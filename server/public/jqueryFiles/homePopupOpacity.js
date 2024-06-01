const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.quiz-popup');
const exitQuiz = document.querySelector('.exit-quiz');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const topicsContainer = document.querySelector('.container');
const topicsBack = document.querySelector('.topics-back');
// const categoryBtns = document.querySelectorAll('.category-btn');


startBtn.onclick = () => {
  popupInfo.classList.add('active');
  main.classList.add('active');
}

exitQuiz.onclick = () => {
  popupInfo.classList.remove('active');
  main.classList.remove('active');
}

continueBtn.onclick = () => {
  topicsContainer.classList.add('active');
  popupInfo.classList.remove('active');
  main.classList.remove('active');
}

topicsBack.onclick = () => {
  topicsContainer.classList.remove('active');
}

// document.addEventListener('DOMContentLoaded', () => {
//   categoryBtns.forEach(button => {
//     button.addEventListener('click', (i) => {
//       const selectedCategory = i.target.getAttribute('data-category');

//       localStorage.setItem('selectedCategory', selectedCategory);
//     });
//   });
// });