/* global $ */
var newQuestion = (function () {
  var questions = [
    { name: 'Something', used: false },
    { name: 'Else', used: false },

  ]
  return function () {
    var currentQuestion;
    do {
      currentQuestion = questions[Math.floor(Math.random() * questions.length)];
    } while (currentQuestion.used);
    $('#question').html(currentQuestion.name);
    currentQuestion.used = true;
  }
})()

// Hulu vs Netflix
// Matt Damon vs Mark Whalburg
// DC vs Marvel
// Sushi vs Pho
// Pirates vs Ninjas
// Football (American) vs Football (everybody else)
// Harry Potter vs The Hunger Games
// Beyonce vs Britney Spears?
