//questions for quiz
var questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "Hyper Trainer Marking Language",
      "Hyper Text Marketing Language",
      "Hyper Text Markup Leveler"
    ],
    correctAnswer: "Hyper Text Markup Language"
  },
  {
    question: "Which of the following is the correct way to use the standard namespace in C++?",
    answers: [
      "Using namespace standard;",
      "Using standard namespace;",
      "Using namespace std;",
      "Standard namespace used;"
    ],
    correctAnswer: "Using namespace std;"
  }, 
  {
    question: "Which of these is NOT a programming language",
    answers: [
      "Rust",
      "Ruby",
      "MATLAB",
      "Pearl"
    ],
    correctAnswer: "Pearl"
  }, 
  {
    question: "Which of the following are logical operators?",
    answers: [
      "&&, ||, !=",
      "||, !, ==",
      "!, ||, &&",
      "||, &&"
    ],
    correctAnswer: "!, ||, &&"
  }, 
  {
    question: "What value would the variable y be equal to? int y = 3 + 5 / 2;",
    answers: [
      "2",
      "4",
      "5",
      "6"
    ],
    correctAnswer: "5"
  }
];

//create empty array for all high scores
var scoreArray = [];

var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var questionElement = document.getElementById("question");
var option0El = document.getElementById("option0");
var option1El = document.getElementById("option1");
var option2El = document.getElementById("option2");
var option3El = document.getElementById("option3");
var highScoreEl = document.getElementById("high-score-title");
var highScoreListEl = document.getElementById("highScores");

var timer;
var timerCount;
var isFinished = false;
var currentQuestion = 0;
var score = 0;

// The startGame function is called when the start button is clicked
function startGame() {
  isFinished = false;
  timerCount = 55;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  startTimer()
  displayQuestions()
  highScoreEl.style.display = 'none';
}

function displayQuestions() {
  questionElement.textContent = questions[currentQuestion].question;
  option0El.textContent = questions[currentQuestion].answers[0];
  option1El.textContent = questions[currentQuestion].answers[1];
  option2El.textContent = questions[currentQuestion].answers[2];
  option3El.textContent = questions[currentQuestion].answers[3];
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if game over is met
      if (isFinished) {
        // Clears interval and stops timer
        clearInterval(timer);
      } 
    }
  }, 1000);
}

//check user's answer
function checkAnswer(event) {
  //look where user clicks
  var userInput = event.target.textContent;
  //if they choose the correct answer
  if (userInput == questions[currentQuestion].correctAnswer) {
    //add to score
    score += 5;
  } else {
    //reduce time for wrong answer
    timerCount -= 5;
  }
  //check if game is over first
  isGameOver()
  //move onto next question if game isn't over
  currentQuestion++;
  //display questions
  displayQuestions()
}

function isGameOver() {
  if (currentQuestion == questions.length - 1 || timerCount == 0) {
    //game is over
    isFinished = true;
    score += timerCount;
    //obtain user name and put into an object
    var name = prompt('You got a new score! Enter name:');
    var userScore = {
      userName:name, userPoints:score
    };

    //get item from scoreArray and push new score in
    scoreArray = JSON.parse(localStorage.getItem("highScores"))||[];
    scoreArray.push(userScore);
    //add score to local storage
    localStorage.setItem("highScores", JSON.stringify(scoreArray));
    //remove question and buttons from scren
    questionElement.style.display = 'none';
    option0El.style.display = 'none';
    option1El.style.display = 'none';
    option2El.style.display = 'none';
    option3El.style.display = 'none';
    //display high score list
    highScoreEl.style.display =  'block';
    displayScores()
  }
}

function displayScores() {
  scoreArray.sort(function (a,b) {
    return b-a;
  })
  for(var i = 0; i < 5; i++) {
    var newScore = document.createElement("li");
    //styling the score list
    newScore.setAttribute("style", "list-style-type: upper-roman; list-style-position: inside;");
    newScore.textContent = scoreArray[i].userName + ' ' + scoreArray[i].userPoints;
    highScoreListEl.append(newScore);
    highScoreListEl.setAttribute("style", "text-align: center;");
  }
}

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

//attach event listener to each option
option0El.addEventListener("click", checkAnswer);
option1El.addEventListener("click", checkAnswer);
option2El.addEventListener("click", checkAnswer);
option3El.addEventListener("click", checkAnswer);