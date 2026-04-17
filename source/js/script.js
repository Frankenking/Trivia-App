// All questions from json
let jsonData = {}

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

// Load json using fetch
function loadJson() {
  fetch("./json/questions.json").then(response => response.json()).then(data =>
    {
      // store questions data in jsonData
      jsonData = data.questions;
      loadQuestion();
      loadAnswers();
    }
  )
}

// Question Pick - Working on - Hayden / Alex
function loadQuestion() {
  const displayQ = document.getElementById("questionPromptID"); // Index from json
  //UNCOMMENT TO TEST
  // displayQ.textContent = jsonData[0].question;
  displayQ.textContent = //Are there any true and false? - Hayden | yes - Artyom
  
  // i think the easiest way to deal with T/F you can check the length of jsonData[#].options and then hide the bottom 2 answer boxes and set the top 2 to true or false
  // you should also add a parameter to this function that loads based on id loadQuestion(id) then load by jsonData[id]
}

// Answers
function loadAnswers() { // Load options into each
  const display1 = document.getElementById("questionAnswerOneLabelID");
  const display2 = document.getElementById("questionAnswerTwoLabelID");
  const display3 = document.getElementById("questionAnswerThreeLabelID");
  const display4 = document.getElementById("questionAnswerFourLabelID");

  //UNCOMMENT TO TEST
  //display1.textContent = jsonData[0].options[0];
  //display2.textContent = jsonData[0].options[1];
  //display3.textContent = jsonData[0].options[2];
  //display4.textContent = jsonData[0].options[3];
}

// End quiz
function endQuiz() {
  clearInterval(Tleft);
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

// Load Json
loadJson();

// Load best score on start
loadBestScore();


//Alex still working on score calculation and local storage^^^