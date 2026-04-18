// All questions from json
let jsonData = [];

// Timer
let timer = 60;
const displayT = document.getElementById("timerSectionID");
const Tleft = setInterval(() =>{
  if (timer <= 0){
    clearInterval(Tleft);
    displayT.textContent = "Time is up!";
    endQuiz()
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
async function loadJson() {
  const response = await fetch("./json/questions.json");
  const data = await response.json();

  jsonData = data.questions;
}

// Question Pick
let curQuestion = 0;
let score = 0;
function loadQuestion() {
  const displayQ = document.getElementById("questionPromptID");
  displayQ.textContent = jsonData[curQuestion].question;
  
  // i think the easiest way to deal with T/F you can check the length of jsonData[#].options and then hide the bottom 2 answer boxes and set the top 2 to true or false
}

// Answers
function loadAnswers() { // Load options into each
  const display1 = document.getElementById("questionAnswerOneLabelID");
  const display2 = document.getElementById("questionAnswerTwoLabelID");
  const display3 = document.getElementById("questionAnswerThreeLabelID");
  const display4 = document.getElementById("questionAnswerFourLabelID");
  // Index+ Options
  const options = jsonData[curQuestion].options; // Thinking of a question limiter cause it will load all 100 right now - Hayden
  display1.textContent = options[0];
  display2.textContent = options[1];
  display3.textContent = options[2];
  display4.textContent = options[3];
}
// Submit Button + Next Question loader
document.getElementById("submit").addEventListener("click", () => {
  const selection = [...document.querySelectorAll('input[name="option"]')]
  .find(r => r.checked && r.offsetParent !== null);
  if (!selection){
    alert("Select a answer!");
    return;
  }
  const selectionOP = jsonData[curQuestion].options[selection.value - 1];
  if (selectionOP === jsonData[curQuestion].answer) {
    score++;
  }
  curQuestion++;
  // Checks Json length
  if(curQuestion >= jsonData.length){
    alert("Quiz Complete!");
    return;
  }
  document.querySelectorAll('input[name="option"]').forEach(r => r.checked = false);
  loadQuestion(); // Next Question & Options Load
  loadAnswers();
});
// Answer Selection Listeners
document.querySelectorAll(".option").forEach((option, i) => {
  option.addEventListener("click", () => {
    if (option.style.display === "none") return;
    const radios = document.querySelectorAll('input[name="option"]');
    const labels = document.querySelectorAll('.questionAnswerLabel');
    const options = jsonData[currentQuestion].options;
    // Radio Buttons
    radios.forEach((radio, i) => {
      if (options[i]) {
        radio.disabled = false;
        radio.parentElement.style.display = "inline";
        labels[i].textContent = options[i];
      } else {
        radio.disabled = true;
        radio.checked = false;
        radio.parentElement.style.display = "none";
      }
    });
});
});

// End quiz
function endQuiz() {

  // updated some of the ids and added hidden class to css so your classList.add works
  // we dont have a length of all the questions yet so i removed that part from the end of ln 144

  clearInterval(Tleft);
  document.getElementById("questionSectionID").classList.add("hidden");

  const resultEl = document.getElementById("scoreDiv");
  resultEl.innerHTML = `
    <h1>Your Score: ${score}<h1>
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
function loadScore(){
  document.getElementById("scoreDiv").textContent = `Score: ${score}`;
}
function loadBestScore() {
  let best = localStorage.getItem("bestScore") || 0;
  const bestScoreEl = document.getElementById("bestScoreDiv"); // added new bestscore element at the bottom
  bestScoreEl.textContent = `Best Score: ${best}`;
}

// Load Json
loadJson();

// insert random selection here before the answers and question is loaded

loadQuestion();
loadAnswers();

// Load best score on start
loadBestScore();


