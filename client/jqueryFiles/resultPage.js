document.addEventListener('DOMContentLoaded', () => {
  const scoreCircle = document.querySelector('.score-circle');
  const scoreText =  document.querySelector('.score-text');
  let progressValue = document.querySelector('.progress-value');
  let score = localStorage.getItem('score');
  let questions = JSON.parse(localStorage.getItem('questions'));

  let progressInitialValue = -1; // -1 because 0 will affect the scoreCircle logic.
  let progressFinalValue = (score / questions.length) * 100;
  let speed = 20;

  let progress = setInterval(() => {
    progressInitialValue++;

    progressValue.textContent = `${progressInitialValue}%`;
    scoreCircle.style.background = `conic-gradient(#959ff3 ${(progressInitialValue / 100) * 360}deg, rgba(255, 255, 255, .1) 0deg)`;
    if (progressInitialValue == progressFinalValue) {
      clearInterval(progress);
    }
  }, speed);

  scoreText.textContent = `You Scored ${score} out of ${questions.length} questions`;
});
