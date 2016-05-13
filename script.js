console.log("script.js start")
 
//declare variables
//count for first female and male roll
var femaleCount = 5;
var maleCount = 5;
//variable to store each new roll of the first male and female (starter pair)
var newFemale;
var newMale;

//variable to store all temporary dogs before they are kept/chosen (usually used in random search discoveries). It is to be a new Dog object
var tempDog;
//an array to hold all of the new puppies when they are born until the user choses two to keep
var tempPuppy = [];
//an array to be paired with tempPuppy. indices are to match. Used to tell whether each puppy has been chosen.
var hasPuppyBeenChosen = [];
//variabels to check if a male and a female have been chosen for breeding
var fBreeder = 0;
var mBreeder = 0;
//variable to count how many puppies have been kept
var keptPuppies = 0;
//object to hold all variables that need to be saved. Makes it simple to output information to save.
var all = {
	//variable to tell whether data has been loaded or not
	data: 0,
	//array to hold new Dog objects of every dog owned
	ownedDogs: [],
	//new object to hold all of the user's info
	userInfo: {
		//variable to hold how much experience a user has gained
		exp: 0,
		//variable to tell what level the user is on
		level: 1,
		//confusing name - refers to how much experience the user has earned after reaching the current level
		currentLevel: 0,
		//to hold how much energy the user has left (max is 20)
		energy: 20,
		//new object to hold count of all the items a user owns
		items: {
			money: 0,
			egg: 0,
			bone: 0,
			beetle: 0,
			rabbitPelt: 0,
			foxPelt: 0,
			bearPelt: 0,
			bearMeat: 0,
			feather: 0
		}
	},
	//variable to keep a count of all dogs owned. Unneccesary - could use all.ownedDogs.length instead. Needs refactor.
	dogCount: 0,
	//variable to hold a copy of the dog the user chooses as it's companion. Any changes to one must affect the other.
	companionDog: null,
	//object to hold times
	times: {
		//variable to hold the current time any time the time is checked
		currentTime: new Date(),
		//variable to hold the time an hour from the last rollover, when the new rollover is allowed to happen
		rollTime: new Date(),
		//variable to hold the next midnight, when a new daily reward is allowed
		midnight: new Date(),
		//variable to hold when the next energy point will be earned
		nextEnergy: new Date()
	}
}

//creates a date method that allows minutes to be added to a time
Date.prototype.addMinutes = function(m) {
	this.SetTime(this.getTime() + (m*60*1000));
	return this;
}

//creates a date method that allows hours to be added to a time
Date.prototype.addHours = function(h) {    
   this.setTime(this.getTime() + (h*60*60*1000)); 
   return this;   
}

//creates a date method that allows days to be added to a date
Date.prototype.addDays = function(d) {
	this.setDate(this.getDate() + d);
	return this;
}

//creates a date method that allows a date to be changed to the next midnight
Date.prototype.toMidnight = function() {
	this.addDays(1);
	this.setHours(0,0,0,0);
	return this;
}

//sets roll time to an hour from page creation
all.times.rollTime.addHours(1);

//sets midnight to midnight of the next day
all.times.midnight.toMidnight();

//create dog constructor
function Dog(size, head, body, legs, tail, ears, eyes, fur, color, sizeValue, headValue, bodyValue, legsValue, tailValue, earsValue, eyesValue, furValue, colorGenes, otherGenes) {
	this.size = size;
	this.head = head;
	this.body = body;
	this.legs = legs;
	this.tail = tail;
	this.ears = ears;
	this.eyes = eyes;
	this.fur = fur;
	this.color = color;
	this.sizeValue = sizeValue;
	this.headValue = headValue;
	this.bodyValue = bodyValue;
	this.legsValue = legsValue;
	this.tailValue = tailValue;
	this.earsValue = earsValue;
	this.eyesValue = eyesValue;
	this.furValue = furValue;
	this.colorGenes = colorGenes;
	this.otherGenes = otherGenes;
	this.cooldown = 0;
}

Dog.prototype.colorGen = function() {
	console.log("colorGen start");

	//set the dog's image to an empty string
	this.image = '';

	//check each gene to see what genetics are applied
	//the genes are as follows:
	//gene1 is the Sable gene - Currently always homozygous recessive - DD = Wolf Sable Dr = Sable rr = shows gene2
	//gene2 is the Irish gene - DD = Solid Dr = Irish rr = Piebald
	//gene3 is the Merle gene - DD/Dr = no change rr = Merle
	//gene4 is the Chocolate gene - DD/Dr = Black rr = Chocolate
	//gene5 is the Dilute gene - DD/Dd = Black (or Chocolate) rr = Blue (or Isabella)
	//gene6 is the Points Gene - DD/Dr = no points rr = points
	//gene7 is the Points Color gene - DD = Red Dr = Tan rr = Brindle
	//gene8 is the Points Color Masking gene - DD/Dr = no change rr = dog's base color is now dependant on gene7
	//gene8 is also affected by recessive coloration - DD = Cream Dr = Silver rr = Silver Brindle

	//check if wolf sable or sable is present (masks all other genes)
	if (this.colorGenes.g1.a1 && this.colorGenes.g1.a2) {
		this.color = "Wolf Sable";
		this.image += '<img class="wolfSable" src="imgs/trans.png"/>';
	} else if (this.colorGenes.g1.a1 || this.colorGenes.g1.a2) {
		this.color = "Sable";
		this.image += '<img class="sable" src="imgs/trans.png"/>';
	} else {
		//checking color only first
		//check if point color masks regular color
		if (!this.colorGenes.g8.a1 && !this.colorGenes.g8.a2) {
			//if it does, check if dilute is present
			if (this.colorGenes.g5.a1 || this.colorGenes.g5.a2) {
				//if it isn't, check the point color
				if (this.colorGenes.g7.a1 && this.colorGenes.g7.a2) {
					//if homozygous dominant, color is red
					this.color = "Red";
					this.image += '<img class="red" src="imgs/trans.png"/>';
				} else if (this.colorGenes.g7.a1 || this.colorGenes.g7.a2) {
					//if heterozygous, color is Tan, shown as Fawn
					this.color = "Fawn";
					this.image += '<img class="fawn" src="imgs/trans.png"/>';
				} else {
					//if homozygous recessive, color is Brindle
					this.color = "Brindle";
					this.image += '<img class="brindle" src="imgs/trans.png"/>';
				}
			} else {
				//if it is, check the point color
				if (this.colorGenes.g7.a1 && this.colorGenes.g7.a2) {
					//if dilute and homozygous dominant, color is Cream
					this.color = "Cream";
					this.image += '<img class="cream" src="imgs/trans.png"/>';
				} else if (this.colorGenes.g7.a1 || this.colorGenes.g7.a2) {
					//if dilute and heterozygous, color is Silver
					this.color = "Silver";
					this.image += '<img class="silver" src="imgs/trans.png"/>';
				} else {
					//if dilute and homozygous recessive, color is Silver Brindle
					this.color = "Silver Brindle";
					this.image += '<img class="silverBrindle" src="imgs/trans.png"/>';
				}
			}
		} else {
			//if point color does not mask, check chocolate gene
			if (!this.colorGenes.g4.a1 && !this.colorGenes.g4.a2) {
				//if chocolate is present, check for dilute
				if (!this.colorGenes.g5.a1 && !this.colorGenes.g5.a2) {
					//if dilute and chocolate
					this.color = "Isabella";
					this.image += '<img class="isabella" src="imgs/trans.png"/>';
				} else {
					//if no dilute and chocolate
					this.color = "Chocolate";
					this.image += '<img class="chocolate" src="imgs/trans.png"/>';
				}
			} else {
				//if chocolate is not present, check for dilute
				if (!this.colorGenes.g5.a1 && !this.colorGenes.g5.a2) {
					//if dilute and black
					this.color = "Blue";
					this.image += '<img class="blue" src="imgs/trans.png"/>';
				} else {
					//if no dilute and black
					this.color = "Black";
					this.image += '<img class="black" src="imgs/trans.png"/>';
				}
			}
		}

		//checking pattern only, adding to color string
		//check for merle, gene3
		if (!this.colorGenes.g3.a1 && !this.colorGenes.g3.a2) {
			//if merle is present, add merle
			this.color += ' Merle';
			this.image += '<img class="merle" src="imgs/trans.png"/>';
		}

		//check gene2, Solid vs Irish vs Piebald
		if(this.colorGenes.g2.a1 && this.colorGenes.g2.a2) {
			this.color += ' (Solid)';
		} else if (this.colorGenes.g2.a1 || this.colorGenes.g2.a2) {
			this.color += ' and White (Irish)';
			this.image += '<img class="irish" src="imgs/trans.png"/>';
		} else {
			this.color += ' and White (Piebald)';
			this.image += '<img class="piebald" src="imgs/trans.png"/>';
		}

		//check gene6, points or no points
		//first check if points mask color
		if (this.colorGenes.g8.a1 || this.colorGenes.g8.a2) {
		//if points do not mask, then allow points
			if (!this.colorGenes.g6.a1 && !this.colorGenes.g6.a2) {
				//if points, check if dilute
				if (this.colorGenes.g5.a1 || this.colorGenes.g5.a2) {
					//if no dilute, check points color
					if (this.colorGenes.g7.a1 && this.colorGenes.g7.a2) {
						this.color += ' with Red Points';
						this.image += '<img class="redPoints" src="imgs/trans.png"/>';
					} else if (this.colorGenes.g7.a1 || this.colorGenes.g7.a2) {
						this.color += ' wiht Tan Points';
						this.image += '<img class="fawnPoints" src="imgs/trans.png"/>';
					} else {
						this.color += ' with Brindle Points';
						this.image += '<img class="brindlePoints" src="imgs/trans.png"/>';
					}
				} else {
					//if dilute, check points color
					if (this.colorGenes.g7.a1 && this.colorGenes.g7.a2) {
						this.color += ' with Cream Points';
						this.image += '<img class="creamPoints" src="imgs/trans.png"/>';
					} else if (this.colorGenes.g7.a1 || this.colorGenes.g7.a2) {
						this.color += ' with Silver Points';
						this.image += '<img class="silverPoints" src="imgs/trans.png"/>';
					} else {
						this.color += ' with Silver Brindle Points';
						this.image += '<img class="silverBrindlePoints" src="imgs/trans.png"/>';
					}
				}
			}
		}
	}
	//check the dog's eye color to add the eye color to the dog's image
	if (this.eyes === "Brown") {
			this.image += '<img class="brownEyes" src="imgs/trans.png"/>';
		} else if (this.eyes === "Amber") {
			this.image += '<img class="amberEyes" src="imgs/trans.png"/>';
		} else {
			this.image += '<img class="blueEyes" src="imgs/trans.png"/>';
		}
		this.image += '<img class="blackNose" src="imgs/trans.png"/>';
		this.image += '<img class="male" src="imgs/trans.png"/>';

	console.log("colorGen end");
	return this;
};
Dog.prototype.otherGen = function() {
	console.log('otherGen start');
	//other genetics
	//gene1 - nub tail
	//gene2 - curly tail (takes precedence over nub)
	//gene3 - button/drop ears (only show button ears when ears are tiny)
	//gene4 - drop coat
	//gene5 - wire coat
	//if drop coat and wire coat are both present, coat is curly
	//gene6 - hairless (only shows if gene4 and gene5 do not show)

	//check if curly tail shows. If not, check if nub tail shows
	if (!this.otherGenes.g2.a1 && !this.otherGenes.g2.a2) {
		this.tail = 'Curly';
	} else {
		if (!this.otherGenes.g1.a1 && !this.otherGenes.g1.a2) {
			this.tail = 'Nub';
		}
	}

	//check if drop ears are present. If so, check if they are tiny. If so, ears are button. If not, ears are drop
	if (!this.otherGenes.g3.a1 && !this.otherGenes.g3.a2) {
		if (this.ears === 'Tiny') {
			this.ears = 'Button';
		} else {
			this.ears = 'Drop';
		}
	}

	//check if drop coat and wire coat are both present. If so, coat is curly. If not, check if drop coat or wire coat is present. 
	//If neither, check if hairless is present
	if ((!this.otherGenes.g4.a1 && !this.otherGenes.g4.a2) && (!this.otherGenes.g5.a1 && !this.otherGenes.g5.a2)) {
		this.fur = 'Curly';
	} else if (!this.otherGenes.g4.a1 && !this.otherGenes.g4.a2) {
		this.fur = 'Drop Coat';
		console.log('drop coat');
	} else if (!this.otherGenes.g5.a1 && !this.otherGenes.g5.a2) {
		this.fur = 'Wire';
		console.log('wire hair');
	} else {
		if (!this.otherGenes.g6.a1 && !this.otherGenes.g6.a2) {
			this.fur = 'Hairless';
		}
	}
	console.log('otherGen end');
	return this;
};
Dog.prototype.removeRecessive = function() {
	console.log('remove recessive started');
	//check for merle and continue retrying until it has at least one dominant alele
	while (!this.colorGenes.g3.a1 && !this.colorGenes.g3.a2) {
		console.log('merle recessive showing');
		this.colorGenes.g3.a1 = Math.round(Math.random());
		this.colorGenes.g3.a2 = Math.round(Math.random());
		if (this.colorGenes.g3.a1 || this.colorGenes.g3.a2) {
			console.log('merle recessive changed');
		}
	}

	//check for chocolate and continue retrying until it has at least one dominant alele
	while (!this.colorGenes.g4.a1 && !this.colorGenes.g4.a2) {
		console.log('chocolate recessive showing');
		this.colorGenes.g4.a1 = Math.round(Math.random());
		this.colorGenes.g4.a2 = Math.round(Math.random());
		if (this.colorGenes.g4.a1 || this.colorGenes.g4.a2) {
			console.log('chocolate recessive changed');
		}
	}

	//check for dilute and continue retrying until it has at least one dominant alele
	while (!this.colorGenes.g5.a1 && !this.colorGenes.g5.a2) {
		console.log('dilute recessive showing');
		this.colorGenes.g5.a1 = Math.round(Math.random());
		this.colorGenes.g5.a2 = Math.round(Math.random());
		if (this.colorGenes.g5.a1 || this.colorGenes.g5.a2) {
			console.log('dilute recessive changed');
		}
	}

	//check for show points and continue retrying until it has at least one dominant alele
	while (!this.colorGenes.g6.a1 && !this.colorGenes.g6.a2) {
		console.log('points recessive showing');
		this.colorGenes.g6.a1 = Math.round(Math.random());
		this.colorGenes.g6.a2 = Math.round(Math.random());
		if (this.colorGenes.g6.a1 || this.colorGenes.g6.a2) {
			console.log('points recessive changed');
		}
	}

	//check for points masking and continue retrying until it has at least one dominant alele
	while (!this.colorGenes.g8.a1 && !this.colorGenes.g8.a2) {
		console.log('points masking recessive showing');
		this.colorGenes.g8.a1 = Math.round(Math.random());
		this.colorGenes.g8.a2 = Math.round(Math.random());
		if (this.colorGenes.g8.a1 || this.colorGenes.g8.a2) {
			console.log('points masking recessive changed');
		}
	}

	//check for nub tail and continue retrying until it has at least one dominant alele
	while (!this.otherGenes.g1.a1 && !this.otherGenes.g1.a2) {
		console.log('nub tail recessive showing');
		this.otherGenes.g1.a1 = Math.round(Math.random());
		this.otherGenes.g1.a2 = Math.round(Math.random());
		if (this.otherGenes.g1.a1 || this.otherGenes.g1.a2) {
			console.log('nub tail recessive changed');
		}
	}

	//check for curly tail and continue retrying until it has at least one dominant alele
	while (!this.otherGenes.g2.a1 && !this.otherGenes.g2.a2) {
		console.log('curly tail recessive showing');
		this.otherGenes.g2.a1 = Math.round(Math.random());
		this.otherGenes.g2.a2 = Math.round(Math.random());
		if (this.otherGenes.g2.a1 || this.otherGenes.g2.a2) {
			console.log('curly tail recessive changed');
		}
	}

	//check for drop ears and continue retrying until it has at least one dominant alele
	while (!this.otherGenes.g3.a1 && !this.otherGenes.g3.a2) {
		console.log('drop ears recessive showing');
		this.otherGenes.g3.a1 = Math.round(Math.random());
		this.otherGenes.g3.a2 = Math.round(Math.random());
		if (this.otherGenes.g3.a1 || this.otherGenes.g3.a2) {
			console.log('drop ears recessive changed');
		}
	}

	//check for drop coat and continue retrying until it has at least one dominant alele
	while (!this.otherGenes.g4.a1 && !this.otherGenes.g4.a2) {
		console.log('drop coat recessive showing');
		this.otherGenes.g4.a1 = Math.round(Math.random());
		this.otherGenes.g4.a2 = Math.round(Math.random());
		if (this.otherGenes.g4.a1 || this.otherGenes.g4.a2) {
			console.log('drop coat recessive changed');
		}
	}

	//check for wire coat and continue retrying until it has at least one dominant alele
	while (!this.otherGenes.g5.a1 && !this.otherGenes.g5.a2) {
		console.log('wire coat recessive showing');
		this.otherGenes.g5.a1 = Math.round(Math.random());
		this.otherGenes.g5.a2 = Math.round(Math.random());
		if (this.otherGenes.g5.a1 || this.otherGenes.g5.a2) {
			console.log('wire coat recessive changed');
		}
	}

	//check for hairless and continue retrying until it has at least one dominant alele
	while (!this.otherGenes.g6.a1 && !this.otherGenes.g6.a2) {
		console.log('hairless recessive showing');
		this.otherGenes.g6.a1 = Math.round(Math.random());
		this.otherGenes.g6.a2 = Math.round(Math.random());
		if (this.otherGenes.g6.a1 || this.otherGenes.g6.a2) {
			console.log('hairless recessive changed');
		}
	}

	//rerun colorGen and otherGen to change the string value of the new genes
	this.recheckDog();

	console.log('remove recessive ended');
	return this;
};
Dog.prototype.allowRecessive = function() {
	//allows chocolate and points the chance to show
	var random = Math.round(Math.random());
	this.colorGenes.g4.a1 = random ? Math.round(Math.random()) : 1;
	random = Math.round(Math.random());
	this.colorGenes.g4.a2 = random ? Math.round(Math.random()) : 1;
	random = Math.round(Math.random());
	this.colorGenes.g6.a1 = random ? Math.round(Math.random()) : 1;
	random = Math.round(Math.random());
	this.colorGenes.g6.a2 = random ? Math.round(Math.random()) : 1;
	this.recheckDog();
	return this;
}
Dog.prototype.recheckDog = function() {
	//check tailValue's random number and assigns value to tail
	switch(this.tailValue) {
		case 1:
		case 2:
		case 3:
			this.tail = 'Short';
			break;
		case 4:
		case 5:
		case 6:
			this.tail = 'Medium';
			break;
		case 7:
		case 8:
		case 9:
			this.tail = 'Long';
			break;
		case 10:
			this.tail = 'Flag';
			break;
		default:
			this.tail = 'ERROR';
			break;
	}

	//check earsValue's random number and assigns value to ears
	switch(this.earsValue) {
		case 1:
		case 2:
		case 3:
			this.ears = 'Tiny';
			break;
		case 4:
		case 5:
		case 6:
		case 7:
			this.ears = 'Average';
			break;
		case 8:
		case 9:
		case 10:
			this.ears = 'Large';
			break;
		default:
			this.ears = 'ERROR';
			break;
	}

	//check furValue's random number and assigns value to ears
	switch(this.furValue) {
		case 1:
		case 2:
		case 3:
			this.fur = 'Long';
			break;
		case 4:
		case 5:
		case 6:
		case 7:
			this.fur = 'Short';
			break;
		case 8:
		case 9:
		case 10:
			this.fur = 'Smooth';
			break;
		default:
			this.fur = 'ERROR';
			break;
	}

	//rerun the this through colorGen and otherGen to change the string of any changed values
	this.colorGen();
	this.otherGen();
	return this;
};
Dog.prototype.assignAgeValue = function() {
	//this.ageValue is in months
	//takes how many whole years the dog has lived and puts it in the years variable
	var years = Math.floor(this.ageValue / 12);
	//takes the remaining months and puts them in the months variable
	var months = this.ageValue % 12;
	//if the dog has lived 0 months
	if (!this.ageValue) {
		//say as such
		this.age = '0 years and 0 months';
	} else {
		this.age = '' + years + (years === 1 ? ' year ' : ' years ') + months + (months === 1 ? ' month' : ' months');
	}
	return this;
};
Dog.prototype.assignGenderValue = function() {
	//uses the boolean value of genderValue
	//if genderValue is 1, then it's female
	if (this.genderValue) {
		this.gender = 'Female';
	//if genderValue is 0, then it's male
	} else {
		this.gender = 'Male';
	}
};
//function to copy a this without copying the reference (allows one this to be changed without affecting the others)
Dog.prototype.addDog = function() {
	return this;
};

//create dog generator
function dogGen(size1, size2, head1, head2, body1, body2, legs1, legs2, tail1, tail2, ears1, ears2, eyes1, eyes2, fur1, fur2, dog1, dog2) {
	console.log("dogGen start");

	//create first dog, minus colorGenes
	var dog = new Dog('', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0);

	//create dog's colorGenes object
	dog.colorGenes = {
		//creates new object for each gene pair
		g1: {
			a1: 0,
			a2: 0
		},
		g2: {
			a1: 0,
			a2: 0
		},
		g3: {
			a1: 0,
			a2: 0
		},
		g4: {
			a1: 0,
			a2: 0
		},
		g5: {
			a1: 0,
			a2: 0
		},
		g6: {
			a1: 0,
			a2: 0
		},
		g7: {
			a1: 0,
			a2: 0
		},
		g8: {
			a1: 0,
			a2: 0
		}
	}

	//create dog's otherGenes object
	dog.otherGenes = {
		//creates new object for each gene pair
		g1: {
			a1: 0,
			a2: 0
		},
		g2: {
			a1: 0,
			a2: 0
		},
		g3: {
			a1: 0,
			a2: 0
		},
		g4: {
			a1: 0,
			a2: 0
		},
		g5: {
			a1: 0,
			a2: 0
		},
		g6: {
			a1: 0,
			a2: 0
		}
	}

	//create dog's skill levels object
	dog.skills = {
		strength: 0,
		agility: 0,
		speed: 0,
		loyalty: 0,
		aggression: 0,
		resilience: 0,
		endurance: 0,
		intelligence: 0
	}

	//assign random gender (0 is male and 1 is female. Can use booleans to check gender [false is male and true is female])
	dog.genderValue = Math.round(Math.random());
	//runs the genderValue function on the new dog, giving the dog a string value of it's gender in the new dog.gender variable
	dog.assignGenderValue();

	//assign random numbers between the parent's aspects (1 and 10 if no parents) to all dog aspects minus colorGenes
	dog.sizeValue = rollPhysicalValues(size1, size2);
	dog.headValue = rollPhysicalValues(head1, head2);
	dog.bodyValue = rollPhysicalValues(body1, body2);
	dog.legsValue = rollPhysicalValues(legs1, legs2);
	dog.tailValue = rollPhysicalValues(tail1, tail2);
	dog.earsValue = rollPhysicalValues(ears1, ears2);
	dog.eyesValue = rollPhysicalValues(eyes1, eyes2);
	dog.furValue = rollPhysicalValues(fur1, fur2);
	//checks to see if these variables have been filled
	if (dog.headValue || dog.bodyValue || dog.legsValue)
		console.log("dogGen random values filled");
	else {
		console.log('ERROR: dogGen random values NOT FILLED');
	}

	//check sizeValue's random number and assigns value to size
	switch(dog.sizeValue) {
		case 1:
			dog.size = 'Extra Small';
			break;
		case 2:
		case 3:
			dog.size = 'Small';
			break;
		case 4:
		case 5:
		case 6:
		case 7:
			dog.size = 'Medium';
			break;
		case 8:
		case 9:
			dog.size = 'Large';
			break;
		case 10:
			dog.size = 'Extra Large';
			break;
		default:
			dog.size = 'ERROR';
			break;
	}

	//check headValue's random number and assigns value to head
	switch(dog.headValue) {
		case 1:
		case 2:
		case 3:
			dog.head = 'Slim';
			break;
		case 4:
		case 5:
		case 6:
		case 7:
			dog.head = 'Average';
			break;
		case 8:
		case 9:
		case 10:
			dog.head = 'Block';
			break;
		default:
			dog.head = 'ERROR';
	}

	//check bodyValue's random number and assigns value to body
	switch(dog.bodyValue) {
		case 1:
		case 2:
			dog.body = 'Petite';
			break;
		case 3:
		case 4:
		case 5:
			dog.body = 'Lean';
			break;
		case 6:
		case 7:
		case 8:
			dog.body = 'Sturdy';
			break;
		case 9:
		case 10:
			dog.body = 'Stocky';
			break;
		default:
			dog.body = "ERROR";
			break;
	}

	//check legsValue's random number and assigns value to legs
	switch(dog.legsValue) {
		case 1:
		case 2:
			dog.legs = 'Stubby';
			break;
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
			dog.legs = 'Average';
			break;
		case 8:
		case 9:
		case 10:
			dog.legs = 'Long';
			break;
		default:
			dog.legs = 'ERROR';
			break;
	}

	//check tailValue's random number and assigns value to tail
	switch(dog.tailValue) {
		case 1:
		case 2:
		case 3:
			dog.tail = 'Short';
			break;
		case 4:
		case 5:
		case 6:
			dog.tail = 'Medium';
			break;
		case 7:
		case 8:
		case 9:
			dog.tail = 'Long';
			break;
		case 10:
			dog.tail = 'Flag';
			break;
		default:
			dog.tail = 'ERROR';
			break;
	}

	//check earsValue's random number and assigns value to ears
	switch(dog.earsValue) {
		case 1:
		case 2:
		case 3:
			dog.ears = 'Tiny';
			break;
		case 4:
		case 5:
		case 6:
		case 7:
			dog.ears = 'Average';
			break;
		case 8:
		case 9:
		case 10:
			dog.ears = 'Large';
			break;
		default:
			dog.ears = 'ERROR';
			break;
	}

	//check eyesValue's random number and assigns value to eyes
	switch(dog.eyesValue) {
		case 1:
			dog.eyes = 'Amber';
			break;
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
			dog.eyes = 'Brown';
			break;
		case 7:
			dog.eyes = 'Heterochromatic (Brown and Blue)';
			break;
		case 8:
		case 9:
		case 10:
			dog.eyes = 'Blue';
			break;
		default:
			dog.eyes = 'ERROR';
			break;
	}

	//check furValue's random number and assigns value to ears
	switch(dog.furValue) {
		case 1:
		case 2:
		case 3:
			dog.fur = 'Long';
			break;
		case 4:
		case 5:
		case 6:
		case 7:
			dog.fur = 'Short';
			break;
		case 8:
		case 9:
		case 10:
			dog.fur = 'Smooth';
			break;
		default:
			dog.fur = 'ERROR';
			break;
	}

	//checks if dog1 and dog2 have colorGenes and otherGenes aspects. If no dogs have been passed, the following code with run
	if (!dog1.colorGenes || !dog2.colorGenes || !dog1.otherGenes || !dog2.otherGenes) {
		//assign either 0 or 1 to each alele in each gene in colorGenes
		//make true recessives have a one in four chance of cropping up
		dog.colorGenes.g1.a1 = Math.round(Math.random());
		dog.colorGenes.g1.a2 = Math.round(Math.random());
		dog.colorGenes.g2.a1 = Math.round(Math.random());
		dog.colorGenes.g2.a2 = Math.round(Math.random());
		var random = Math.round(Math.random());
		dog.colorGenes.g3.a1 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.colorGenes.g3.a2 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.colorGenes.g4.a1 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.colorGenes.g4.a2 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.colorGenes.g5.a1 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.colorGenes.g5.a2 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.colorGenes.g6.a1 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.colorGenes.g6.a2 = random ? Math.round(Math.random()) : 1;
		dog.colorGenes.g7.a1 = Math.round(Math.random());
		dog.colorGenes.g7.a2 = Math.round(Math.random());
		random = Math.round(Math.random());
		dog.colorGenes.g8.a1 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.colorGenes.g8.a2 = random ? Math.round(Math.random()) : 1;

		//assign either 0 or 1 to each alele in each gene in otherGenes
		//make true recessives have a 1 in 4 chance of cropping up
		random = Math.round(Math.random());
		dog.otherGenes.g1.a1 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.otherGenes.g1.a2 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.otherGenes.g2.a1 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.otherGenes.g2.a2 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.otherGenes.g3.a1 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.otherGenes.g3.a2 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.otherGenes.g4.a1 = random ? Math.round(Math.random()) : 1;
		dog.otherGenes.g4.a2 = Math.round(Math.random());
		dog.otherGenes.g5.a1 = Math.round(Math.random());
		dog.otherGenes.g5.a2 = Math.round(Math.random());
		dog.otherGenes.g6.a1 = Math.round(Math.random());
		dog.otherGenes.g6.a2 = Math.round(Math.random());
	} else {
		//if two dogs were passed, and both have colorGenes and otherGenes aspects, call breedDogs to get the genetics of the new dog
		breedDogs(dog, dog1.colorGenes, dog2.colorGenes, dog1.otherGenes, dog2.otherGenes);
	}

	//checks if dogs were passed to breed the new dog.
	if (!(dog1 === undefined) && !(dog2 === undefined)) {
		//if dogs were passed, then use the parent's skills to decide the new dog's skills
		rollSkillValues(dog.skills, dog1.skills, dog2.skills);
	} else {
		//if no dog's were passed, assign each skill a value between 1 and 21
		for (var key in dog.skills) {
			dog.skills[key] = Math.ceil((Math.random() * 100) * 0.2);
		}
	}

	//run colorGen and otherGen on the dog to get the string value of it's genetics
	dog.colorGen();
	dog.otherGen();
	console.log("dogGen end");
	return dog;
}

//create a breed dog function, that pulls the new dog's genetics from the parents. To be used in dogGen when parents are not passed.
function breedDogs(dog, colors1, colors2, others1, others2) {
	//loop through all gene pairs in colorGenes
	for (var key in dog.colorGenes) {
		//sets random to either 0 or 1 (random)
		var random = Math.round(Math.random());
		//if random is 1
		if (random) {
			//new dog's first alele for this gene will be from parent 1 and second alele will be from parent 2
			//reroll random to either 0 or 1 (random)
			random = Math.round(Math.random());
			//if random is 1, then alele 1 will be alele 1 from parent 1
			if (random) {
				dog.colorGenes[key].a1 = colors1[key].a1;
			//if random is 0, then alele 1 will be alele 2 from parent 1
			} else {
				dog.colorGenes[key].a1 = colors1[key].a2;
			}
			//reroll random to either 0 or 1 (random)
			random = Math.round(Math.random());
			//if random is 1, then alele 2 will be alele 1 from parent 2
			if (random) {
				dog.colorGenes[key].a2 = colors2[key].a1;
			//if random is 0, then alele 2 will be alele 2 from parent 2
			} else {
				dog.colorGenes[key].a2 = colors2[key].a2;
			}
		} else {
			//else new dog's first alele will be from parent 2 and second alele will be from parent 1
			//reroll random to either 0 or 1 (random)
			random = Math.round(Math.random());
			//if random is 1, then alele 2 will be alele 1 from parent 1
			if (random) {
				dog.colorGenes[key].a2 = colors1[key].a1;
			//if random is 0, then alele 2 with be alele 2 from parent 1
			} else {
				dog.colorGenes[key].a2 = colors1[key].a2;
			}
			//reroll random to either 0 or 1 (random)
			random = Math.round(Math.random());
			//if random is 1, then alele 1 will be alele 1 from parent 2
			if (random) {
				dog.colorGenes[key].a1 = colors2[key].a1;
			//if random is 0, then alele 1 will be alele 2 from parent 2
			} else {
				dog.colorGenes[key].a1 = colors2[key].a2;
			}
		}
	}
	//does the same thing as above, only for otherGenes instead colorGenes
	for (var key in dog.otherGenes) {
		var random = Math.round(Math.random());
		if (random) {
			random = Math.round(Math.random());
			if (random) {
				dog.otherGenes[key].a1 = others1[key].a1;
			} else {
				dog.otherGenes[key].a1 = others1[key].a2;
			}
			random = Math.round(Math.random());
			if (random) {
				dog.otherGenes[key].a2 = others2[key].a1;
			} else {
				dog.otherGenes[key].a2 = others2[key].a2;
			}
		} else {
			random = Math.round(Math.random());
			if (random) {
				dog.otherGenes[key].a2 = others1[key].a1;
			} else {
				dog.otherGenes[key].a2 = others1[key].a2;
			}
			random = Math.round(Math.random());
			if (random) {
				dog.otherGenes[key].a1 = others2[key].a1;
			} else {
				dog.otherGenes[key].a1 = others2[key].a2;
			}
		}
	}
	return dog;
}

//creates a function to roll for each physical value (head, tail, fur, etc). To be used on each value. Will need to be called multiple times
function rollPhysicalValues(one, two) {
	console.log('Roll Physics started');
	//creates a value variable to be returned for the current value
	var value;
	//check if the first value passed (the first parent, or 1 if no parent passed) is greater than the second (the second parent, or 10 if not parent passed)
	if (one >= two) {
		//if the two values passed are within 2 places of each other, allow some wiggle room on each side
		if ((one - two) < 2) {
			//give a +1 margin on either side
			one++;
			two--;
			//if this sends the value over the 1-10 limit, bring it back inside
			if (one > 10)
				one = 10;
			if (two < 1)
				two = 1;
		}
		//reroll the new value until it is between the two passed values (possibly with wiggle room [see above])
		do {
			value = Math.floor(Math.random() * 10) + 1;
		} while ((value > one) || (value < two))
		return value;
	} else {
	//if the second value is greater than the first, than do the same as above, only flip the values
		if ((two - one) < 2) {
			two++;
			one--;
			if (two > 10)
				two = 10;
			if (one < 1)
				one = 1;
		}
		do {
			value = Math.floor(Math.random() * 10) + 1;
		} while ((value < one) || (value > two))
		return value;
	}
}

//rolls skill values.
function rollSkillValues(skills, one, two) {
	//declare local variables.
	//the first passed value turned into a percent
	var percent1;
	//half of the second value
	var half;
	//a third of the second value
	var third;
	//loops through all of the values in skills
	for (var key in skills) {
		//if no parents were passed to the function, each skill is to be a number between 1 and 25
		if ((one === undefined) || (two === undefined)) {
			skills[key] = Math.ceil((Math.random() * 100) * 0.25);
		} else {
		//if parents were passed, each skill is to be based off the parents
			//first check which value is greater
			if (one[key] > two[key]) {
				//the greater value is to be stored in percent1 as a percent value
				percent1 = one[key] / 100;
				//the lesser value is to be stored in half as a half value and in third as a third value
				half = Math.round(two[key] / 2);
				third = two[key] / 3;
				//set the skill value between 1 and the larger value passed
				skills[key] = Math.ceil((Math.random() * 100) * percent1);
				//if the skill value is less than half of the smaller value passed, than set it equal to that half
				skills[key] = (skills[key] < half) ? half : skills[key];
				//add a third of the smaller value to the skill value
				skills[key] += Math.ceil(third);
			} else {
				//do the same as above, only with the values flipped
				percent1 = two[key] / 100;
				half = Math.round(one[key] / 2);
				third = one[key] / 3;
				skills[key] = Math.ceil((Math.random() * 100) * percent1);
				skills[key] = (skills[key] < half) ? half : skills[key];
				skills[key] += Math.ceil(third);
			}
		}
	}
}

//list all current dogs
function listDogs() {
	//empty the dog list
	$('#dogList').html('');
	//loop through all dog's owned
	for (i = 0; i < all.dogCount; i++) {
		//if the the owned dog is filled (ie, not dead), then show the dog
		if (all.ownedDogs[i]) {
			//add a button to the dog list for the current dog in the loop
			$('#dogList').append('<button type="button" id="showDog' + i + '" class="btn btn-info btn-lg">' + all.ownedDogs[i].name + '</button>');
			//add an event to the button
			showDogButtonFill(i);
		}
	}
	$('#dogList').append('<div style="display: inline-block" id="doneWithDog"></div>');
}

//function to provide the even for a breed button. Intended to be used in a loop through all shown dogs
//!!**COMMENTING NEEDED FROM HERE DOWN**!!
function breedDogButtonFill(i, gender) {
	//if breedDog button is pressed
	$('#breedDog' + i).on('click', function() {
		//if it's a girl (true boolean)
		if (gender) {
			//a female has been picked
			fBreeder = 1;
			//show the female as one of the choices
			$('#femaleChoice').html('<button type="button" id="femaleDogChoice" class="btn btn-info btn-lg" value="' + i + '">' + all.ownedDogs[i].name + '</button>');
		} else {
			//a male has been picked
			mBreeder = 1;
			//show the male as one of the choices
			$('#maleChoice').html('<button type="button" id="maleDogChoice" class="btn btn-info btn-lg" value="' + i + '">' + all.ownedDogs[i].name + '</button>');
		}

		//if both a male and female have been picked
		if ((fBreeder + mBreeder) === 2) {
			$('#maleChoice').after('<button type="button" id="breedChosenPair" class="btn btn-success btn-lg">Breed Pair</button>');
			$('#breedChosenPair').on('click', function() {
				console.log('breeding started')
				f = $('#femaleDogChoice').val();
				m = $('#maleDogChoice').val();
				all.ownedDogs[f].cooldown = 6;
				$('#currentOption').html('');
				var random = Math.round((Math.round(Math.random() * 10) + 1) / 2);
				for (var x = 0; x <= random; x++) {
					tempPuppy[x] = dogGen(all.ownedDogs[f].sizeValue, all.ownedDogs[m].sizeValue, all.ownedDogs[f].headValue, all.ownedDogs[m].headValue, all.ownedDogs[f].bodyValue, all.ownedDogs[m].bodyValue, all.ownedDogs[f].legsValue, all.ownedDogs[m].legsValue, all.ownedDogs[f].tailValue, all.ownedDogs[m].tailValue, all.ownedDogs[f].earsValue, all.ownedDogs[m].earsValue, all.ownedDogs[f].eyesValue, all.ownedDogs[m].eyesValue, all.ownedDogs[f].furValue, all.ownedDogs[m].furValue, all.ownedDogs[f], all.ownedDogs[m]);
					tempPuppy[x].ageValue = 0;
					ageValue(tempPuppy[x]);
					$('#currentOption').append('<center><div style="width: 100%; margin: 0 auto;" class="alert alert-success alert-lg dogLongCells center"><strong>Puppy ' + (x + 1) + '</strong></div></center>\
						<div class="row"><div class="alert alert-info dogCells"><strong>Size:</strong> ' + tempPuppy[x].size + 
						'</div><div class="alert alert-info dogCells"><strong>Head:</strong> ' + tempPuppy[x].head + 
						'</div><div class="alert alert-info dogCells"><strong>Body:</strong> ' + tempPuppy[x].body + 
						'</div><div class="alert alert-info dogCells"><strong>Legs:</strong> ' + tempPuppy[x].legs +
						'</div></div><div class="row"><div class="alert alert-info dogCells"><strong>Tail:</strong> ' + tempPuppy[x].tail + 
						'</div><div class="alert alert-info dogCells"><strong>Ears:</strong> ' + tempPuppy[x].ears + 
						'</div><div class="alert alert-info dogCells"><strong>Eyes:</strong> ' + tempPuppy[x].eyes + 
						'</div><div class="alert alert-info dogCells"><strong>Fur:</strong> ' + tempPuppy[x].fur + 
						'</div></div><div class="row"><div class="alert alert-info dogHalfCells"><strong>Gender:</strong> ' + tempPuppy[x].gender +
						'</div><div class="alert alert-info dogHalfCells"><strong>Age:</strong> ' + tempPuppy[x].age + 
						'</div></div><div class="row"><div class="alert alert-info dogLongCells"><strong>Color:</strong> ' + tempPuppy[x].color + 
						'</div></div><div class="dogImg">' + tempPuppy[x].image + '</div>\
						<center><button type="button" id="puppy' + x + '" style="margin-bottom: 20px;" class="btn btn-success btn-lg">Keep Puppy ' + (x + 1) + '</button>');

					$('#alerts').html('<div id="caught" class="alert alert-warning center"><strong>You may keep two puppies.</strong> You\'ve picked ' + keptPuppies + (keptPuppies === 1 ? ' puppy.' : ' puppies.') + '</div>');
				
					hasPuppyBeenChosen[x] = false;
					keepPuppyButtonFill(x);
				}
				$('#currentOption').append('<center><button type="button" id="keepNoMorePuppies" class="btn btn-danger btn-lg">That\'s all I want to keep</button>');
				$('#keepNoMorePuppies').on('click', function() {
					$('#currentOption').html('');
					$('#alerts').html('');
				})
			})
		}
	})
}

function keepPuppyButtonFill(x) {
	$('#puppy' + x).on('click', function() {
		if (!hasPuppyBeenChosen[x]) {
			if (keptPuppies < 2) {
				tempPuppy[x].name = prompt("Name your new puppy!");
				all.ownedDogs[all.dogCount] = tempPuppy[x];
				all.dogCount++;
				listDogs();
				hasPuppyBeenChosen[x] = true;
				keptPuppies++;
				$('#alerts').html('<div id="caught" class="alert alert-warning center"><strong>You may keep two puppies.</strong> You\'ve picked ' + keptPuppies + (keptPuppies === 1 ? ' puppy.' : ' puppies') + '</div>');
				if (keptPuppies === 2) {
					$('#alerts').html('<div id="caught" class="alert alert-success center"><strong>You may keep two puppies.</strong> You\'ve picked ' + keptPuppies + (keptPuppies === 1 ? ' puppy.' : ' puppies.') + '</div>');
					$('#currentOption').html('');
				}
			}
		}
	})
}

function showDogButtonFill(x) {
	$('#showDog' + x).on('click', function() {
		ageValue(all.ownedDogs[x]);
		$('#currentDog').html('<center><div style="width: 100%; margin: 0 auto;" class="alert alert-success alert-lg dogLongCells center"><strong>' + all.ownedDogs[x].name + '</strong></div></center>\
			<div class="row"><div class="alert alert-info dogCells"><strong>Size:</strong> ' + all.ownedDogs[x].size + 
			'</div><div class="alert alert-info dogCells"><strong>Head:</strong> ' + all.ownedDogs[x].head + 
			'</div><div class="alert alert-info dogCells"><strong>Body:</strong> ' + all.ownedDogs[x].body + 
			'</div><div class="alert alert-info dogCells"><strong>Legs:</strong> ' + all.ownedDogs[x].legs +
			'</div></div><div class="row"><div class="alert alert-info dogCells"><strong>Tail:</strong> ' + all.ownedDogs[x].tail + 
			'</div><div class="alert alert-info dogCells"><strong>Ears:</strong> ' + all.ownedDogs[x].ears + 
			'</div><div class="alert alert-info dogCells"><strong>Eyes:</strong> ' + all.ownedDogs[x].eyes + 
			'</div><div class="alert alert-info dogCells"><strong>Fur:</strong> ' + all.ownedDogs[x].fur + 
			'</div></div><div class="row"><div class="alert alert-warning dogCells"><strong>Strength:</strong> ' + all.ownedDogs[x].skills.strength + 
			'</div><div class="alert alert-warning dogCells"><strong>Agility:</strong> ' + all.ownedDogs[x].skills.agility + 
			'</div><div class="alert alert-warning dogCells"><strong>Speed:</strong> ' + all.ownedDogs[x].skills.speed + 
			'</div><div class="alert alert-warning dogCells"><strong>Loyalty:</strong> ' + all.ownedDogs[x].skills.loyalty + 
			'</div></div><div class="row"><div class="alert alert-warning dogCells"><strong>Aggression:</strong> ' + all.ownedDogs[x].skills.aggression + 
			'</div><div class="alert alert-warning dogCells"><strong>Resilience:</strong> ' + all.ownedDogs[x].skills.resilience + 
			'</div><div class="alert alert-warning dogCells"><strong>Endurance:</strong> ' + all.ownedDogs[x].skills.endurance + 
			'</div><div class="alert alert-warning dogCells"><strong>Intelligence:</strong> ' + all.ownedDogs[x].skills.intelligence + 
			'</div></div><div class="row"><div class="alert alert-info dogHalfCells"><strong>Gender:</strong> ' + all.ownedDogs[x].gender +
			'</div><div class="alert alert-info dogHalfCells"><strong>Age:</strong> ' + all.ownedDogs[x].age + 
			'</div></div><div class="row"><div class="alert alert-info dogLongCells"><strong>Color:</strong> ' + all.ownedDogs[x].color + 
			'</div></div><div class="dogImg">' + all.ownedDogs[x].image + '</div>');
		if (all.ownedDogs[x].cooldown) {
			$('#currentDog').prepend('<center><div style="width: 100%; margin: 0 auto; margin-bottom: 10px;" class="alert alert-warning alert-lg dogLongCells center"><strong>' + all.ownedDogs[x].name + '</strong> is on breeding cooldown. She cannot be bred for another ' + all.ownedDogs[x].cooldown + (all.ownedDogs[x].cooldown === 1 ? ' month' : ' months') + '.</div></center>');
		}
		addDogButtons(x);
	})
}

function addDogButtons(x) {
	$('#doneWithDog').html('<button type="button" id="doneWithDogButton" class="btn btn-success btn-lg inline">Hide Dog</button>');
	$('#currentDog').append('<div id="dogButtons" class="inline center"></div>');
		$('#dogButtons').html('<button type="button" id="myCompanionDog" class="btn btn-success btn-lg inline">Make this dog my companion</button>');
		$('#myCompanionDog').on('click', function() {
			all.companionDog = all.ownedDogs[x];
		})
		$('#dogButtons').append('<button type="button" id="releaseDog" class="btn btn-danger btn-lg inline">Release Dog</button>');
		$('#releaseDog').on('click', function() {
			if (confirm('Are you sure you want to release this dog?')) {
				$('#alerts').append('<div id="dogReleased" class="alert alert-danger center">' + all.ownedDogs[x].name + ' has been released!');
				$('#currentDog').html('');
				all.ownedDogs[x] = null;
				listDogs();
			}
		})
		$('#doneWithDogButton').on('click', function() {
			$('#currentDog').html('');
			$('#doneWithDog').html('');
		})
}

function checkTimeEvents() {
	_.each(all.ownedDogs, function(value, key, collection) {
		//create a local function to set a dog as dead
		function deadDog(dog) {
			$('#alerts').append('<div class="alert alert-danger center">' + value.name + ' has passed away.</div>');
			dog = null;
			return dog;
		}

		//checks if the dog is over a certain age
		//if the dog is over 8, there's a 1 in 10 chance it will die
		//if the dog is over 10, there is a 1 in 4 chance it will die
		//if the dog is over 12, there's a 50/50 chance it will die
		if (value.ageValue > 144) {
			var random = Math.round(Math.random);
			if (!random) {
				deadDog(value);
			}
		} else if (value.ageValue > 120) {
			var random = Math.floor((Math.random() * 100) * 0.04);
			if (!random) {
				deadDog(value);
			}
		} else if (value.ageValue > 96) {
			var random = Math.floor((Math.random() * 100) * 0.1);
			if (!random) {
				deadDog(value);
			}
		}

		//checks if the dog just turned 12 (an adult, old enough to breed)
		if (value.ageValue === 12) {
			$('#alerts').append('<div class="alert alert-success center">Congratulations! ' + value.name + ' has turned a year old! ' + (value.ageValue ? 'She' : 'He') + ' can now breed, and compete in competitions!</div>');
		}
	});
}

//function to check if the starter female and starter male have been selected
function bothKept(f, m) {
	var sum = f + m;
	if (sum === 2) {
		console.log("both have been kept");
		//clear the last dog picked from the screen
		$('#currentOption').html('');
		//continue the game
		gameContinue();
	}
}

//function to roll the game over to a new month
function newMonth() {
	//adds a month to the age of all live dogs
	_.each(all.ownedDogs, function(value, key, collection) {
		if (value) {
			value.ageValue++;
		}
	})

	//alerts the user that a rollover has begun. Nothing else can happen until the user presses the continue button.
	$('#alerts').html('<div class="alert alert-warning center"><strong>It\'s time for a rollover!</strong> A month has passed. You\'re dogs are now one month older!');
	checkTimeEvents();
	$('#currentOption').html('<center><button type="button" class="btn btn-success btn-lg" id="continue">Continue</button></center>');
	$('#optionList').html('');

	$('#continue').on('click', function() {
		$('#currentOption').html('');
		$('#alerts').html('');

		all.times.currentTime = new Date();
		all.times.rollTime = new Date();
		all.times.rollTime.addHours(1);

		gameContinue();
	})
}

//function to run once a day (after midnight) that gives the user a boost for getting on
function newMidnight() {
	//gives the user 50 gold for logging in
	$('#alerts').html('<div class="alert alert-warning center"><strong>Welcome to a new day of the Great Canine Creation Game!</strong> Here\'s an extra <strong>50 gold</strong> for your daily bonus.</div>');
	all.userInfo.items.money += 50;

	//resets midnight to the next midnight
	all.times.midnight = new Date();
	all.times.midnight.toMidnight();
}

//function to continue the game once the original pair of dogs have been created, or save data was loaded
function gameContinue() {
	//list all currently owned dogs
	listDogs();
	//list all currently available options
	$('#optionList').html('<button type="button" id="searchButton" class="btn btn-success btn-lg">Search</button>\
		<button type="button" id="breedButton" class="btn btn-success btn-lg">Breed</button>');

	//code for what happens when "Search" is clicked
	$('#searchButton').on('click', function() {
		//remove last dog from #currentOption
		$('#currentOption').html('');
		$('#alerts').html('');
		searchOptions();
	});

	$('#breedButton').on('click', function() {
		keptPuppies = 0;
		fBreeder = 0;
		mBreeder = 0;
		console.log('breed button clicked');
		$('#alerts').html('');
		$('#currentOption').html('<div id="pickYourDog" style="margin: 0px auto;" class="alert alert-success alert-lg dogLongCells center"><strong>Pick the two dogs you want to breed:</strong></div>\
			<div style="margin: 2%" id="femaleList"><div style="margin-left: 0; display: block;" class="alert alert-warning dogHalfCells">Female</div></div>\
			<div style="margin: 2%;" id="maleList"><div style="margin-left: 0; display: block;" class="alert alert-warning dogHalfCells">Male</div></div>\
			<center><div id="femaleChoice" style="margin: 2%; display: inline-block;"></div><div id="maleChoice" style="display: inline-block;"></div></center>');
		for (i = 0; i < all.dogCount; i++) {
			if (all.ownedDogs[i]) {
				if ((all.ownedDogs[i].ageValue >= 12) && !all.ownedDogs[i].cooldown) {
					if (all.ownedDogs[i].genderValue) {
						$('#femaleList').append('<button type="button" id="breedDog' + i + '" class="btn btn-info btn-lg">' + all.ownedDogs[i].name + '</button>');
						breedDogButtonFill(i, true);
					} else {
						$('#maleList').append('<button type="button" id="breedDog' + i + '" class="btn btn-info btn-lg">' + all.ownedDogs[i].name + '</button>');
						breedDogButtonFill(i, false);
					}
				}
			}
		}
		
	});
}

//function to add to how much energy the user has
function addEnergy() {
	//sets diff to the difference (in milliseconds) between the current time and the time the last energy was given
	var diff = all.times.currentTime - all.times.nextEnergy;
	//turns the milliseconds into minutes and divides the minutes by five, rounding down
	diff = Math.floor(Math.round(((diff % 86400000) % 3600000) / 60000)/5);
	//if diff is greater than zero, then more energy points can be awarded
	if (diff > 0) {
		//add however many new energy points the user deserves
		all.userInfo.energy += diff;
		//multiply diff back into 5 minute intervals
		diff *= 5;
		//add that many minutes to the "nextEnergy" variable, making that the starting point for all subsequent energy point checks
		all.times.nextEnergy.addMinutes(diff);
	}
}

//search option functions start
function searchOptions() {
	all.times.currentTime = new Date();
	if (all.userInfo.energy !== 20) {
		addEnergy();
	}

	if (all.times.currentTime >= all.times.rollTime) {
		newMonth();
	} else if (all.times.currentTime >= all.times.midnight) {
		newMidnight();
	} else if (all.userInfo.energy !== 0) {
		all.userInfo.energy--;
		gameContinue();

		var option = Math.ceil((Math.random() * 100) *.40);
		switch (option) {
			case 1:
			case 20:
			case 34:
			case 38:
				foundDog();
				break;
			case 2:
			case 21:
				foundMoney();
				break;
			case 3:
			case 22:
				foundTree();
				break;
			case 4:
			case 23:
				foundBuried();
				break;
			case 5:
			case 24:
			case 39:
				foundRabbit();
				break;
			case 6:
			case 25:
			case 40:
				foundFox();
				break;
			case 7:
			case 26:
				foundWildDog();
				break;
			case 8:
				foundBear();
				break;
			case 9:
			case 27:
				foundInjury();
				break;
			case 10:
			case 28:
				foundBirdScream();
				break;
			case 11:
			case 29:
			case 35:
			case 36:
			case 37:
				foundNothing();
				break;
			case 12:
				foundDogPack();
				break;
			case 13:
				foundBobcat();
				break;
			case 14:
				foundButterfly();
				break;
			case 15:
				foundBee();
				break;
			case 16:
			case 30:
				foundClearSkies();
				break;
			case 17:
			case 31:
				foundClouds();
				break;
			case 18:
			case 32:
				foundWind();
				break;
			case 19:
			case 33:
				foundHotSun();
				break;
			default:
				$('#alerts').html('<div class="alert alert-danger center"><strong>ERROR!</strong> Something went wrong.</div>');
				break;
		}
	} else {
		$('#alerts').append('<div class="alert alert-danger center"><strong>You\'re out of energy!</strong> You must wait for more energy before you can search again.');
	}
}

function foundDog() {
	//create new temp dog
	tempDog = dogGen(10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1);

	//remove possibility of recessives
	removeRecessive(tempDog);

	//assign age (random between 1 and 6 years[written in months])
	tempDog.ageValue = Math.floor(Math.random() * 60) + 12;
	ageValue(tempDog);

	//assign genderValue
	tempDog.genderValue = Math.round(Math.random());
	genderValue(tempDog);
	$('#alerts').html('<div id="foundDog" class="alert alert-success center">You found a lone dog!</div>');

	//show rolled dog
	$('#currentOption').html('<div class="row"><div class="alert alert-info dogCells"><strong>Size:</strong> ' + tempDog.size + 
		'</div><div class="alert alert-info dogCells"><strong>Head:</strong> ' + tempDog.head + 
		'</div><div class="alert alert-info dogCells"><strong>Body:</strong> ' + tempDog.body + 
		'</div><div class="alert alert-info dogCells"><strong>Legs:</strong> ' + tempDog.legs +
		'</div></div><div class="row"><div class="alert alert-info dogCells"><strong>Tail:</strong> ' + tempDog.tail + 
		'</div><div class="alert alert-info dogCells"><strong>Ears:</strong> ' + tempDog.ears + 
		'</div><div class="alert alert-info dogCells"><strong>Eyes:</strong> ' + tempDog.eyes + 
		'</div><div class="alert alert-info dogCells"><strong>Fur:</strong> ' + tempDog.fur + 
		'</div></div><div class="row"><div class="alert alert-info dogHalfCells"><strong>Gender:</strong> ' + tempDog.gender +
		'</div><div class="alert alert-info dogHalfCells"><strong>Age:</strong> ' + tempDog.age + 
		'</div></div><div class="row"><div class="alert alert-info dogLongCells"><strong>Color:</strong> ' + tempDog.color + 
		'</div></div><div class="dogImg">' + tempDog.image + '</div>');

	//give option to try to catch dog and remove previous option, if applicable
	$('#catchButton').remove();
	$('#optionList').append('<button type="button" id="catchButton" class="btn btn-info btn-lg">Catch</button>');

	//button for catch
	$('#catchButton').on('click', function() {
		//roll for a random number to see if the user catchs the dog
		var roll = Math.floor(Math.random() * 4) + 1;
		//if the roll was equal to the user's level or lower, the user catchs the dog
		if (roll <= all.userInfo.level) {
			//alert the user that they caught the dog
			$('#alerts').html('<div id="caught" class="alert alert-success center"><strong>Caught!</strong> You caught this dog!</div>');
			//get the user to name the new dog
			tempDog.name = prompt('Name your new dog!');
			//add the new dog to the owned Dog list
			all.ownedDogs[all.dogCount] = addDog(tempDog);
			//change the dog count to reflect the number of dogs the user has
			all.dogCount++;
			//list all the user's dogs, including the new dog
			listDogs();
			//remove the catch button from the options list
			$('#catchButton').remove();
			//clears the current dog from the page once caught
			$('#currentOption').html('');
		//if not, the user doesn't catch the dog
		} else {
			//let the user know they didn't catch the dog
			$('#alerts').html('<div id="failure" class="alert alert-danger center"><strong>Failed!</strong> Oh no! It got away!</div>');
			//remove the catch button from the options list
			$('#catchButton').remove();
		}
	});
}

function foundMoney() {
	var random = Math.ceil((Math.random() * 100) * .2) + 5;
	console.log(random);
	$('#alerts').html('<div class="alert alert-success center">Awesome! You found <strong>' + random + ' gold</strong>!');
	all.userInfo.items.money += random;
}

function foundTree() {
	var filler = all.companionDog ? ' with ' + all.companionDog.name : ''; 
	var random = Math.round(Math.random());
	$('#currentOption').html('<div class="alert alert-info center">While walking' + filler + ', you come across a massive tree. There\'s something glinting at you from up in the branches. Should you try to climb the tree and see what it is?</div>');
	$('#currentOption').append('<center><button type="button" id="climbTree" class="btn btn-success">Climb the tree!</button> <button type="button" id="leaveTree" class="btn btn-warning">Leave it be</button></center>');

	$('#climbTree').on('click', function() {
		var money = 0;
		var eggs = 0;
		var exp = 0;
		var successText = '<div class="alert alert-info center">Gripping the rough bark of the massive tree trunk, \
						you struggle to get a grip with your bare hands. After a few minutes and a steep learning curve, you find enough\
						 purhcase to wriggle your way up into the banches and shove leaves out of the way until you find your prize:';
		if (random) {
			random = Math.ceil((Math.random() * 100) * .04);
			exp = Math.ceil(((Math.random() * 100) * 0.3) + (all.userInfo.exp * 5)); 
			switch (random) {
				case 1:
					exp *= 3;
					money += Math.ceil((Math.random() * 100) * .2);
					all.userInfo.items.money += money;
					$('#alerts').append('<div class="alert alert-success">You obtained <strong>' + money + ' gold</strong> and <strong>' + exp + ' exp</strong>!</div>');
					$('#currentOption').html(successText + ' a small glittering pile of gold! You feel a tougher after your workout!</div>');
					break;
				case 2:
					exp *= 2;
					eggs += Math.ceil((Math.random() * 100) * .04);
					eggsStr = (eggs === 1) ? 'egg' : 'eggs';
					all.userInfo.items.egg += eggs;
					$('#alerts').append('<div class="alert alert-success">You obtained <strong>' + eggsStr + '</strong> and <strong>' + exp + ' exp</strong>!</div>');
					$('#currentOption').html(successText + ' a little nest full of tiny eggs! You feel a little tougher after your workout!</div>');
					break;
				case 3:
					exp *= 3;
					all.userInfo.items.bone += 1;
					$('#alerts').append('<div class="alert alert-success">You obtained a <strong>bone</strong> and <strong>' + exp + ' exp</strong>!</div>');
					$('#currentOption').html(successText + ' a shiny white thigh bone, complete with gnaw marks and bits of flesh! You feel a little tougher after your workout!</div>');
					break;
				case 4:
					exp *= 1.5;
					$('#alerts').append('<div class="alert alert-success">You obtained <strong>' + exp + ' exp</strong>!</div>');
					$('#currentOption').html(successText + ' a great big pile of nothing! But you do feel a little tougher after your workout!</div>');
					break;
			}
		} else {
			exp = Math.round((Math.random() * 100) * 0.3);
			$('#alerts').append('<div class="alert alert-warning">You obtained <strong>' + exp + ' exp</strong>!</div>');
			$('#currentOption').html('<div class="alert alert-info center">Gripping the rough bark of the massive tree trunk, you struggle to get a grip with your bare hands. \
				After a few minutes and several humiliating attempts, you give up and slink away, hoping no one else saw that . . .</div>');
		}
	});

	$('#leaveRock').on('click', function() {
		$('#currentOption').html('');
	});
}

function foundBuried() {
	var filler = all.companionDog ? ' with ' + all.companionDog.name : ''; 
	$('#currentOption').html('<div class="alert alert-info center">While walking' + filler + ', you come across a massive rock! You can see something just under it\'s startling weight. Do you try to move the rock?</div>');
	$('#currentOption').append('<center><button type="button" id="moveRock" class="btn btn-success">Move the rock!</button> <button type="button" id="leaveRock" class="btn btn-warning">Leave it be</button></center>');

	$('#moveRock').on('click', function() {
		var money = 0;
		var beetles = 0;
		var exp = 0;
		var successText = '<div class="alert alert-info center">Wrapping your fingers around the under-side of the fat stone, you lock your legs and strain, pulling with all your might! \
		Finally, with a great heave, you flip the massive rock to find your prize:';
		var random = Math.round(Math.random());
		if (random) {
			random = Math.ceil((Math.random() * 100) * .04);
			exp = Math.round(((Math.random() * 100) * 0.3) + (all.userInfo.exp * 5)); 
			switch (random) {
				case 1:
					exp *= 3;
					money += Math.ceil((Math.random() * 100) * .2);
					all.userInfo.items.money += money;
					$('#alerts').append('<div class="alert alert-success">You obtained <strong>' + money + ' gold</strong> and <strong>' + exp + ' exp</strong>!</div>');
					$('#currentOption').html(successText + ' a small glittering pile of gold! You feel a tougher after your workout!</div>');
					break;
				case 2:
					exp *= 2;
					beetles += Math.ceil((Math.random() * 100) * .04);
					var beetlesStr = (beetles === 1) ? 'egg' : 'eggs';
					all.userInfo.items.beetle += beetles;
					$('#alerts').append('<div class="alert alert-success">You obtained <strong>' + beetles + beetlesStr + '</strong> and <strong>' + exp + ' exp</strong>!</div>');
					$('#currentOption').html(successText + ' a small pile of pretty little beetles! You feel a little tougher after your workout!</div>');
					break;
				case 3:
					exp *= 3;
					all.userInfo.items.bone += 1;
					$('#alerts').append('<div class="alert alert-success">You obtained a <strong>bone</strong> and <strong>' + exp + ' exp</strong>!</div>');
					$('#currentOption').html(successText + ' a shiny white rib bone, complete with gnaw marks and bits of flesh! You feel a little tougher after your workout!</div>');
					break;
				case 4:
					exp *= 1.5;
					$('#alerts').append('<div class="alert alert-success">You obtained <strong>' + exp + ' exp</strong>!</div>');
					$('#currentOption').html(successText + ' a great big pile of nothing! But you do feel a little tougher after your workout!</div>');
					break;
			}
		} else {
			exp = Math.round((Math.random() * 100) * 0.3);
			$('#alerts').append('<div class="alert alert-warning">You obtained <strong>' + exp + ' exp</strong>!</div>');
			$('#currentOption').html('<div class="alert alert-info center">Wrapping your fingers around the under-side of the fat stone, you lock your legs and strain, pulling with all your might! \
				Unfortunately, it seems like this rock is a little better settled into the ground than you though. You have to give up, slinking away' + filler + ', hoping no one else saw that . . .</div>');
		}
	});

	$('#leaveRock').on('click', function() {
		$('#currentOption').html('');
	});
}

function foundRabbit() {
	var filler = all.companionDog ? ' with ' + all.companionDog.name : '';
	var rabbit = '<div class="alert alert-info center">While strolling about' + filler + ', a flash of gray across your path\
	 catchs your eye. <strong>It\'s a rabbit!</strong>. ';
	if (!all.companionDog) {
		$('#currentOption').html(rabbit + 'Unfortunately, you don\'t have a companion dog with you, and you don\'t really have the legs to catch that little guy. Looks like you\'ll just have to watch and appreciate the beauty of nature.');
	} else {
		var hisHer = all.companionDog.genderValue ? 'her' : 'his';
		var himHer = all.companionDog.genderValue ? 'her' : 'him';
		var heShe = all.companionDog.genderValue ? 'she' : 'he';
		$('#currentOption').html(rabbit + all.companionDog.name + ' looks ready to burst out of ' + hisHer + ' skin with excitement. Do you let ' + himHer + ' chase after it?');
		$('#currentOption').append('<center><button type="button" id="chaseRabbit" class="btn btn-success">Let ' + himHer + ' chase it!</button> <button type="button" id="leaveRabbit" class="btn btn-warning">Leave it be</button></center>');
	}

	$('#chaseRabbit').on('click', function() {
		var random = Math.round(Math.random());
		if (!random) {
			$('#currentOption').html('<div class="alert alert-warning center">' + all.companionDog.name + ' tears off after the fluffy creature, legs pumping wildly as ' + heShe + ' tries to catch up to the wee gray thing. Unfortunately, \
				it seems the hopper is just a bit more wily than ' + all.companionDog.name + ' today, and it manages to slip out of ' + hisHer + ' grasp. Maybe next time.</div>');
		} else {
			successText = '<div class="alert alert-info center">' + all.companionDog.name + ' tears off after the fluffy creature, teeth bared and feet flashing. The rabbit flails in fear, scrambling to escape ' + hisHer + ' slavering jaws. \
			Unfortunately for the wee thing, it just isn\'t quite quick enough to slip past the maw of death. ';
			
		}
	})
}

function foundFox() {
	var filler = all.companionDog ? ' with ' + all.companionDog.name : '';
	var buttons = '<center><button type="button" id="climbTree" class="btn btn-success">Climb the tree!</button> <button\
	 type="button" id="leaveTree" class="btn btn-warning">Leave it be</button></center>';
	$('#currentOption').html('<div class="alert alert-info center">While strolling about' + filler + ', a flash of red across your path\
	 catchs your eye. <strong>It\'s a fox!</strong>.</div>');
}

function foundWildDog() {
	var filler = all.companionDog ? ' with ' + all.companionDog.name : ''; 
	var random = Math.round(Math.random());
	$('#currentOption').html('<div class="alert alert-info center">While walking' + filler + ', you find a wild dog!</div>');
}

function foundBear() {
	var filler = all.companionDog ? ' with ' + all.companionDog.name : ''; 
	$('#currentOption').html('<div class="alert alert-info center">While walking' + filler + ', you find a bear!</div>');
}

function foundInjury() {
	var filler = all.companionDog ? ' with ' + all.companionDog.name : '';
	$('#currentOption').html('<div class="alert alert-info center">While walking' + filler + ', you get hurt!</div>');
}

function foundBirdScream() {
	var filler = all.companionDog ? ' with ' + all.companionDog.name : '';
	$('#currentOption').html('<div class="alert alert-info center">While walking' + filler + ', a bird screams at you!</div>');
}

function foundNothing() {
	var filler = all.companionDog ? ' with ' + all.companionDog.name : '';
	$('#currentOption').html('<div class="alert alert-info center">While walking' + filler + ', you find absolutely nothing!</div>');
}

function foundDogPack() {
	var filler = all.companionDog ? ' with ' + all.companionDog.name : '';
	$('#currentOption').html('<div class="alert alert-info center">While walking' + filler + ', you find a pack of wild dogs!</div>');
}

function foundBobcat() {
	var filler = all.companionDog ? ' with ' + all.companionDog.name : '';
	$('#currentOption').html('<div class="alert alert-info center">While walking' + filler + ', you find a bobcat!</div>');
}

function foundButterfly() {
	var filler = all.companionDog ? ' with ' + all.companionDog.name : '';
	$('#currentOption').html('<div class="alert alert-info center">While walking' + filler + ', you find a butterfly!</div>');
}

function foundBee() {
	var filler = all.companionDog ? ' with ' + all.companionDog.name : ''; 
	$('#currentOption').html('<div class="alert alert-info center">While walking' + filler + ', you step on a bee. That hurt!</div>');
}

function foundClearSkies() {
	var filler = all.companionDog ? ' with ' + all.companionDog.name : '';
	$('#currentOption').html('<div class="alert alert-info center">While walking' + filler + ', the skies are beautiful and clear!</div>');
}

function foundClouds() {
	var filler = all.companionDog ? ' with ' + all.companionDog.name : '';
	$('#currentOption').html('<div class="alert alert-info center">While walking' + filler + ', you see some evil looking clouds up in the skies. Maybe it\'s going to rain?</div>');
}

function foundWind() {
	var filler = all.companionDog ? ' with ' + all.companionDog.name : ''; 
	$('#currentOption').html('<div class="alert alert-info center">While walking' + filler + ', it\'s super windy out here . . .</div>');
}

function foundHotSun() {
	var filler = all.companionDog ? ' with ' + all.companionDog.name : '';
	$('#currentOption').html('<div class="alert alert-info center">While walking' + filler + ', you can feel the back of your neck burning!</div>');
}

//debug to allow save data to be loaded, if applicable
//console must be open for this to work
debugger;

//check if data was loaded
//if not, open the beginning prompts
if (!all.data) {
	//have you kept your first male or female
	var femaleKept = 0;
	var maleKept = 0;

	//change data's value to show that we now have save data
	all.data = 1;

	//add alert to alert div to announce that the user has no dogs yet
	$('#alerts').append('<div id="noDogs" class="alert alert-success center">You don\'t yet have any dogs! We\'ll have to fix that.</div>');
	//add alerts to alert div to tell the user how many rolls they have left for each dog
	$('#alerts').append('<div id="femaleRolls" class="alert alert-warning center">You have ' + femaleCount + ' out of 5 rolls left for your female.');
	$('#alerts').append('<div id="maleRolls" class="alert alert-warning center">You have ' + maleCount + ' out of 5 rolls left for your male.');

	//add two buttons to optionList to roll for a male and roll for a female
	$('#optionList').append('<button type="button" id="rollFemale" class="btn btn-info btn-lg">Roll for female</button>');
	$('#optionList').append('<button type="button" id="rollMale" class="btn btn-info btn-lg">Roll for male</button>');
	
	//add code to buttons to roll for dogs
	$('#rollFemale').on('click', function() {
		console.log("click successful");
		if (femaleCount) {
			//run dog gen with all physical features possible and set the returned dog object equal to newFemale
			newFemale = dogGen(10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1);
			//remove the possibility of sable and wolf sable
			newFemale.colorGenes.g1.a1 = 0;
			newFemale.colorGenes.g1.a2 = 0;
			//remove any chance of rolling breed-only genes
			newFemale.removeRecessive();
			//allows certain recessive genes to show in the first pair of dogs
			newFemale.allowRecessive();

			//set the newFemale's age as 24 months/2 years
			newFemale.ageValue = 24;
			newFemale.assignAgeValue();
			newFemale.genderValue = 1;
			newFemale.assignGenderValue();;

			//show the currently rolled dog
			$('#currentOption').html('<div class="row"><div class="alert alert-info dogCells"><strong>Size:</strong> ' + newFemale.size + 
				'</div><div class="alert alert-info dogCells"><strong>Head:</strong> ' + newFemale.head + 
				'</div><div class="alert alert-info dogCells"><strong>Body:</strong> ' + newFemale.body + 
				'</div><div class="alert alert-info dogCells"><strong>Legs:</strong> ' + newFemale.legs +
				'</div></div><div class="row"><div class="alert alert-info dogCells"><strong>Tail:</strong> ' + newFemale.tail + 
				'</div><div class="alert alert-info dogCells"><strong>Ears:</strong> ' + newFemale.ears + 
				'</div><div class="alert alert-info dogCells"><strong>Eyes:</strong> ' + newFemale.eyes + 
				'</div><div class="alert alert-info dogCells"><strong>Fur:</strong> ' + newFemale.fur + 
				'</div></div><div class="row"><div class="alert alert-info dogLongCells"><strong>Color:</strong> ' + newFemale.color + 
				'</div></div><div class="dogImg">' + newFemale.image + '</div>');

			//fix to keep keepFemale button from running script multiple times when there have been multiple rolls
			$('#keepFemale').remove();
			$('#optionList').prepend('<button type="button" id="keepFemale" class="btn btn-info btn-lg">Keep Female</button>');
			

			//uses one of the five rolls given to the user at the start
			femaleCount--;

			//changes the text of the femaleRolls alert to reflect how many rolls are left
			$('#femaleRolls').text('You have ' + femaleCount + ' out of 5 rolls left for your female.');
			//if the user is out of rolls, change the alert from a warning to danger (yellow to red)
			if (!femaleCount) {
				$('#femaleRolls').remove('alert-warning');
				$('#femaleRolls').addClass('alert-danger');
			}

			//create code for the keep button to keep the current female
			$('#keepFemale').on('click', function() {
				//removes the "You don't have any dogs" notification
				$('#noDogs').remove();
				//removes any remaining rolls
				femaleCount = 0;
				//name the new female
				newFemale.name = prompt("Name your new female:");
				//adds the female to the users array of dogs
				all.ownedDogs[all.dogCount] = newFemale;
				//changes the dog count to reflect the new dog
				all.dogCount++;
				//changes the female roll alert to reflect that you've chosen your first female
				$('#femaleRolls').text('You\'ve chosen your first female!');
				$('#femaleRolls').removeClass('alert-warning alert-danger');
				$('#femaleRolls').addClass('alert-success');
				//changes the femaleKept variable to reflect that the female was kept
				femaleKept = 1;
				//run bothKept to check if both buttons have been clicked
				bothKept(femaleKept, maleKept);
			});
		//if the user is out of rolls for their female . . . 
		} else {
			//check if they have kept a female
			if (femaleKept) {
				//if so, let them know they've already chosen one
				$('#femaleRolls').text('You\'ve already picked your female!');
			} else {
				//if they haven't kept a female yet, tell them they must keep this one
				$('#femaleRolls').text('You\'re out of rolls! You must keep this dog.');
			}
		}
	});	

	$('#rollMale').on('click', function() {
		console.log("click successful");
		//if 
		if (maleCount) {
			//run dog gen with all physical features possible
			newMale = dogGen(10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1);
			//remove the possibility of sable and wolf sable
			newMale.colorGenes.g1.a1 = 0;
			newMale.colorGenes.g1.a2 = 0;
			//remove any chance of rolling breed-only genes
			newMale.removeRecessive();
			//allows certain recessive genes to show in the first pair of dogs
			newMale.allowRecessive();

			//set the newMale's age as 24 months/2 years
			newMale.ageValue = 24;
			newMale.assignAgeValue();
			newMale.genderValue = 0;
			newMale.assignGenderValue();

			//show the currently rolled dog
			$('#currentOption').html('<div class="row"><div class="alert alert-info dogCells"><strong>Size:</strong> ' + newMale.size + 
				'</div><div class="alert alert-info dogCells"><strong>Head:</strong> ' + newMale.head + 
				'</div><div class="alert alert-info dogCells"><strong>Body:</strong> ' + newMale.body + 
				'</div><div class="alert alert-info dogCells"><strong>Legs:</strong> ' + newMale.legs +
				'</div></div><div class="row"><div class="alert alert-info dogCells"><strong>Tail:</strong> ' + newMale.tail + 
				'</div><div class="alert alert-info dogCells"><strong>Ears:</strong> ' + newMale.ears + 
				'</div><div class="alert alert-info dogCells"><strong>Eyes:</strong> ' + newMale.eyes + 
				'</div><div class="alert alert-info dogCells"><strong>Fur:</strong> ' + newMale.fur + 
				'</div></div><div class="row"><div class="alert alert-info dogLongCells"><strong>Color:</strong> ' + newMale.color + 
				'</div></div><div class="dogImg">' + newMale.image + '</div>');

			//fix to keep keepMale button from running script multiple times when there have been multiple rolls
			$('#keepMale').remove();
			$('#optionList').append('<button type="button" id="keepMale" class="btn btn-info btn-lg">Keep Male</button>');

			//uses one of the 5 rolls the user was given at the start
			maleCount--;

			//changes the male rolls alert to reflect the amount of rolls left to the user
			$('#maleRolls').text('You have ' + maleCount + ' out of 5 rolls left for your male.');
			//if the user is out of rolls, set the alert to danger (red)
			if (!maleCount) {
				$('#maleRolls').remove('alert-warning');
				$('#maleRolls').addClass('alert-danger');
			}

			//if the keep male button is clicked . . .
			$('#keepMale').on('click', function() {
				//remove any remaining rolls left to the user
				maleCount = 0;
				//name the new male
				newMale.name = prompt("Name your new male:");
				//add the current dog to the user's dog array
				all.ownedDogs[all.dogCount] = newMale;
				//change the dog count to reflect the user's number of dogs
				all.dogCount++;
				//changes the male rolls alert to reflect that a male has been chosen
				$('#maleRolls').text('You\'ve chosen your first male!');
				$('#maleRolls').removeClass('alert-warning alert-danger');
				$('#maleRolls').addClass('alert-success');
				//change the male kept variable to reflect that a male has been kept
				maleKept = 1;
				//run bothKept to check if both keep buttons have been clicked
				bothKept(femaleKept, maleKept);
			});
		} else {
			//if out of rolls
			if (maleKept) {
				//if the male has already been chosen, let the user know that
				$('#maleRolls').text('You\'ve already picked your male!');
			} else {
				//if the male has not been chosen, let the user know they must keep the current dog
				$('#maleRolls').text('You\'re out of rolls! You must keep this dog.');
			}
		}
	});	
} else {
	gameContinue();
}