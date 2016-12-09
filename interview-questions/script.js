/* global $, questions */
$('.references').hide();

var newQuestion = function () {
  if (!questions.length) {
    $('.question').html('Woohoo! Nice job!');
  } else {
    var i = Math.floor(Math.random() * questions.length);
    var question = questions[i];
    $('.question').html(question.question);
    $('.references').hide();
    if (!question.references.length) {
      $('.references').html('Looks like there aren\'t any references for this yet. Maybe consider adding some <a href="https://github.com/ryo-capricorn92/ryo-capricorn92.github.io">here</a>');
    } else {
      $('.references').html('');
      question.references.forEach(function (reference) {
        $('.references').append('<a href="' + reference + '">' + reference.slice(reference.indexOf('//') + 2, 30) + '</a><br />');
      });
    }
  }
}

var showReferences = function () {
  $('.references').toggle();
}
