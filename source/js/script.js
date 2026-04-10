// Timer
let timer = 60;
const displayT = document.getElementById("timerSectionID");
const Tleft = setInterval(() =>{
  if (timer <= 0){
    clearInterval(Tleft);
    displayT.textContent = "Time is up!";
  }
  else {
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    let countdownD = 
      String(minutes).padStart(2, "0") + ":" +
      String(seconds).padStart(2, "0");
    displayT.textContent = countdownD;
    timer--;
  }
}, 1000);

// Question Pick - Working on - Hayden / Alex
const displayQ = document.getElementById("questionPromptID");
const display1 = document.getElementById("questionAnswerOneLabelID");
const display2 = document.getElementById("questionAnswerTwoLabelID");
const display3 = document.getElementById("questionAnswerThreeLabelID");
const display4 = document.getElementById("questionAnswerFourLabelID");


// End quiz
function endQuiz() {
  clearInterval(timer);
  document.getElementById("quiz-box").classList.add("hidden");
  nextBtn.classList.add("hidden");

  resultEl.classList.remove("hidden");
  resultEl.innerHTML = `
    <h2>Your Score: ${score}/${questions.length}</h2>
  `;

  saveScore(score);
  loadBestScore();
}

// Local Storage
function saveScore(score) {
  let best = localStorage.getItem("bestScore") || 0;
  if (score > best) {
    localStorage.setItem("bestScore", score);
  }
}
function loadBestScore() {
  let best = localStorage.getItem("bestScore") || 0;
  bestScoreEl.textContent = best;
}

// Load best score on start
loadBestScore();


//Alex still working on score calculation and local storage^^^