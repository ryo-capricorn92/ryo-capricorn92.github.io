// // //functional
// // function Animal(name, legs, type) {
// // 	var animal = {};
// // 	var numLegs = legs;

// // 	animal.name = name;
// // 	animal.legs = function() {
// // 		return numLegs;
// // 	};
// // 	animal.type = type;

// // 	animal.run = function () {
// // 		console.log("running");
// // 	}

// // 	return {getLegs: animal.legs, run: animal.run};
// // };

// // var dog = Animal("Rover", 4, "Mammal");
// // var cat = Animal("Puss", 4, "Mammal");



// //psuedoclassical
// function Animal(name, legs, type) {
// 	this.name = name;
// 	this.legs = legs;
// 	this.type = type;
// }

// var dog = new Animal("Rover", 4, "Mammal");

// Animal.prototype.run = function () {
// 	console.log(this.name + ' is running.');
// }

// var cat = new Animal("Puss", 4, "Mammal");

// cat.run();
// //"Puss is running"
// dog.run();
// //"Rover is running"

// cat.legs = 3;