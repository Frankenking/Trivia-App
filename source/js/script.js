// All questions from json
let jsonData = [];
const QUESTION_LIMIT = 100;
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

  jsonData = shuffleArray(data.questions).slice(0, QUESTION_LIMIT);
  
  loadQuestion();
  loadAnswers();
}

// Added random function
function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// Question Pick
let curQuestion = 0;
let score = 0;
function loadQuestion() {
  const displayQ = document.getElementById("questionPromptID");
  displayQ.textContent = jsonData[curQuestion].question;
}

// i think the easiest way to deal with T/F you can check the length of jsonData[#].options and then hide the bottom 2 answer boxes and set the top 2 to true or false


// Answers
function loadAnswers() { // Load options into each
const options = jsonData[curQuestion].options;

  const radios = [
    document.getElementById("questionAnswerOneButton"),
    document.getElementById("questionAnswerTwoButton"),
    document.getElementById("questionAnswerThreeButton"),
    document.getElementById("questionAnswerFourButton")
  ];

  const labels = [
    document.getElementById("questionAnswerOneLabelID"),
    document.getElementById("questionAnswerTwoLabelID"),
    document.getElementById("questionAnswerThreeLabelID"),
    document.getElementById("questionAnswerFourLabelID")
  ];

  //gets random order, except for true/false questions
  let order= [0,1,2,3];
  if (options.length === 4) {
    order= shuffleArray(order);
  }
  
  for (let i = 0; i < 4; i++) {
    if (options[i]) {
      labels[i].textContent = options[order[i]];

      radios[i].style.display = "flex";
      labels[i].style.display = "flex";
    } else {
      radios[i].style.display = "none";
      labels[i].style.display = "none";

      radios[i].checked = false;
    }
  }
}

// Submit Button + Next Question loader
document.getElementById("submit").addEventListener("click", () => {
  const resultEl = document.getElementById("scoreDiv");
  const selection = [...document.querySelectorAll('input[name="option"]')]
  .find(r => r.checked && r.offsetParent !== null);
  if (!selection){
    alert("Select a answer!");
    return;
  }
  const selectionOP = document.querySelector('input[name="option"]:checked').labels[0].innerText;
  if (selectionOP === jsonData[curQuestion].answer) {
    score++;
    resultEl.innerHTML = `
    Score: ${score}
  `;
  }
  curQuestion++;
  // Checks Json length
  if(curQuestion >= jsonData.length){
    alert("Quiz Complete!");
    endQuiz();
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
    const options = jsonData[curQuestion].options;
    // Radio Buttons
    radios.forEach((radio, i) => {
      if (options[i]) {
        radio.disabled = false;
        radio.parentElement.style.display = "flex";
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

// Load best score on start
loadBestScore();


