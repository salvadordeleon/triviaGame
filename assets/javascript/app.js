// starter values
var counter = 30;
var currentQuestion = 0;
var score = 0;
var lost = 0;
var timer;

// Show the questions and answers on the screen.
function loadQuestion() {
  var question = triviaQuestion[currentQuestion].question;
  var choices = triviaQuestion[currentQuestion].choices;

  $("#time").html("Timer: " + counter);
  $("#game").html(`
      <h4>${question}</h4>
      ${loadChoices(choices)}
      `);
}

function loadChoices(choices) {
  var result = '';

  for (var i = 0; i < choices.length; i++) {
    result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
  }
  return result;

}

loadQuestion();
