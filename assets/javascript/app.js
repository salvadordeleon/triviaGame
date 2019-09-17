// starter values
var counter = 0;
var currentQuestion = 0;
var score = 0;
var lost = 0;
var timer;

// if timer is at 0 go to next question
function nextQuestion() {
  var allDone = triviaQuestion.length - 1 === currentQuestion;

  if (allDone) {
    displayResult();
  } else {
    currentQuestion++;
    loadQuestion();
  }
}

//create a timer...

function timeUp() {
  clearInterval(timer);

  lost++;

  nextQuestion();
}

function countDown() {
  counter--;

  $("#time").html("Timer: " + counter);

  if (counter === 0) {
    timeUp();
  }
}

// Show the questions and answers on the screen.
function loadQuestion() {
  counter = 5;
  timer = setInterval(countDown, 1000);

  var question = triviaQuestion[currentQuestion].question;
  var choices = triviaQuestion[currentQuestion].choices;

  $("#time").html("Timer: " + counter);
  $("#game").html(`
      <h4>${question}</h4>
      ${loadChoices(choices)}
      `);
}

function loadChoices(choices) {
  var result = "";

  for (var i = 0; i < choices.length; i++) {
    result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
  }
  return result;
}
// right or wrong answer triggers next question...
$(document).on("click", ".choice", function() {
  clearInterval(timer);
  var selectedAnswer = $(this).attr("data-answer");
  var correctAnswer = triviaQuestion[currentQuestion].correctAnswer;

  if (correctAnswer === selectedAnswer) {
    score++;
    nextQuestion();
    console.log("winner winner!");
  } else {
    lost++;
    nextQuestion();
    console.log("LOOOOOOSER!!!");
  }
});

function displayResult() {
  var result = `
  <p>You got ${score} questions(s) right</p>
  <p>You missed ${lost} questions(s) right</p>
  <p>Total Questions ${triviaQuestion.length} questions(s) right</p>
  <button class="btn btn-success" id="reset">Reset Game</button>
  `;

  $("#game").html(result);
}

loadQuestion();
