/* global $ */
var newQuestion = (function () {
  var questions = [
    { name: 'Hulu vs Netflix', used: false },
    { name: 'Matt Damon vs Mark Wahlberg', used: false },
    { name: 'DC vs Marvel', used: false },
    { name: 'Sushi vs Pho', used: false },
    { name: 'Pirates vs Ninjas', used: false },
    { name: 'Divergant vs The Hunger Games', used: false },
    { name: 'American Football vs Football (Soccer)', used: false },
    { name: 'Beyonce vs Britney Spears', used: false },
    { name: 'Elvis vs Johnny Cash', used: false },
    { name: 'Deciduous vs Coniferous', used: false },
    { name: 'Math vs Art', used: false },
    { name: 'Rainforest vs Mountains', used: false },
    { name: 'Star Wars vs Star Trek', used: false },
    { name: 'Disneyland vs Disney World', used: false },
    { name: 'Vampires vs Werewolves', used: false },
    { name: 'Dr. Who vs Battlestar Galactica', used: false },
    { name: 'Game of Thrones vs The Walking Dead', used: false },
    { name: 'Pancakes vs Waffles', used: false },
    { name: 'Ben Affleck Batman vs George Clooney Batman', used: false },
    { name: 'Flash vs Arrow', used: false },
    { name: 'Cupcake vs Muffin', used: false },
    { name: 'Spring vs Autumn', used: false },
    { name: 'Crayons vs Markers', used: false },
    { name: 'Bubble Sort vs Insertion Sort', used: false },
    { name: 'React vs Angular', used: false },
    { name: 'Call vs Apply', used: false },
    { name: 'Spaghetti vs Lasagna', used: false },
    { name: 'Captain America vs Iron Man', used: false },
    { name: 'Kanye West vs Chuck Norris', used: false },
    { name: 'The movie vs The book', used: false },
    { name: 'Monopoly vs Clue', used: false },
    { name: 'Board games vs Video Games', used: false },
    { name: 'PC vs Mac', used: false },
    { name: 'PC vs Console (gaming)', used: false },
    { name: 'Rural vs Urban', used: false },
    { name: 'Harry Potter vs Buffy the Vampire Slayer', used: false },
    { name: 'Country vs Rap', used: false },
    { name: 'Asian Cuisine vs Italian Cuisine', used: false },
    { name: 'Will Smith vs Tom Hanks', used: false },
    { name: 'Lady Gaga vs Niki Minaj', used: false },
    { name: 'Classic Film vs Classic Literature', used: false },
    { name: 'Science vs History', used: false },
    { name: 'Herbivore vs Carnivore', used: false },
    { name: 'Snakes vs Spiders', used: false },
    { name: 'Manga vs Comics', used: false },
    { name: 'Walmart vs Target', used: false },
    { name: 'Chicken vs Turkey', used: false },
    { name: 'BMW vs Mercedes', used: false },
    { name: 'iPhone vs Android', used: false },
    { name: 'Adventure vs Action', used: false },
    { name: 'Hugh Jackman vs Hugh Laurie', used: false },
    { name: 'Nickelodeon vs Cartoon Network', used: false },
    { name: 'Alaska vs Hawaii', used: false },
    { name: 'Christmas vs New Years', used: false },
    { name: 'Bacon vs Sausage', used: false },
    { name: 'Strawberry vs Banana', used: false },
    { name: 'Sweet vs Spicy', used: false },
    { name: 'Taco vs Pizza', used: false },
    { name: 'Fire vs Water', used: false },
    { name: 'Steven King vs James Patterson', used: false },
    { name: 'Horror vs Romance', used: false },
    { name: 'Morning Bird vs Night Owl', used: false },
    { name: 'Coffee vs Tea', used: false },
    { name: 'Summer vs Winter', used: false },
    { name: 'R2D2 vs BB-8', used: false },
    { name: 'Pokemon vs Digimon', used: false },
    { name: 'Mario vs Donkey Kong', used: false },
    { name: 'Atronomy vs Astrology', used: false }
    // { name: '', used: false },

  ]
  return function () {
    var currentQuestion;
    var count = 0;
    do {
      count++;
      if (count > 200) {
        currentQuestion = 'That\'s all I got!';
        $('#question').html(currentQuestion);
        return;
      }
      currentQuestion = questions[Math.floor(Math.random() * questions.length)];
    } while (currentQuestion.used);
    $('#question').html(currentQuestion.name);
    currentQuestion.used = true;
  }
})()
