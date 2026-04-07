class Timer {
    constructor(timerSection) {
        let timer = 60;
        const Tleft = setInterval(() =>{
            if (timer <= 0){
                clearInterval(Tleft);
                console.log("Time is up!");
            }
            else {
                console.log(timer + " seconds left!");
                timer--;
            }
        }, 1000);
    }
} // Working on timer rn ^ Hayden


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