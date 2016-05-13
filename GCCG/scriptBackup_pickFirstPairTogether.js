console.log("script.js start")

//declare variables
//variable to tell whether save data has been loaded
var data = 0;
//count for first female and male roll
var femaleCount = 5;
var maleCount = 5;
var newFemale;
var newMale;
//create an array to hold all the user's owned dogs
var ownedDogs = [];
//create object to hold user information
var userInfo = {};
userInfo.exp = 0;
userInfo.level = 1;
userInfo.currentLevel = 0;
//number to count how many dogs the user has - used to add new dogs to the ownedDogs array
var dogCount = 0;
//
var tempDog;
var tempPuppy = [];
var tempBreed = [];
var hasPuppyBeenChosen = [];
var tempBreed = [];
var fBreeder = 0;
var mBreeder = 0;
var mBreeder = 0;
var keptPuppies = 0;
var companionDog;

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
}

//create dog generator
function dogGen(size1, size2, head1, head2, body1, body2, legs1, legs2, tail1, tail2, ears1, ears2, eyes1, eyes2, fur1, fur2, dog1, dog2) {
	console.log("dogGen start");

	//create first dog, minus colorGenes
	var dog = new Dog('', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0);

	//create dog's colorGenes object
	dog.colorGenes = {
		g1a1: 0,
		g1a2: 0,
		g2a1: 0,
		g2a2: 0,
		g3a1: 0,
		g3a2: 0,
		g4a1: 0,
		g4a2: 0,
		g5a1: 0,
		g5a2: 0,
		g6a1: 0,
		g6a2: 0,
		g7a1: 0,
		g7a2: 0,
		g8a1: 0,
		g8a2: 0
	}

	//create dog's otherGenes object
	dog.otherGenes = {
		g1a1: 0,
		g1a2: 0,
		g2a1: 0,
		g2a2: 0,
		g3a1: 0,
		g3a2: 0,
		g4a1: 0,
		g4a2: 0,
		g5a1: 0,
		g5a2: 0,
		g6a1: 0,
		g6a2: 0
	}

	//create dog's skill levels object
	dog.skills = {
		strength: 0,
		agility: 0,
		speed: 0,
		loyalty: 0,
		aggression: 0,
		endurance: 0,
		intelligence: 0
	}

	//assign random gender
	dog.genderValue = Math.round(Math.random());
	genderValue(dog);

	//assign random numbers between 1 and 10 to all dog aspects minus colorGenes
	dog.sizeValue = rollPhysicalValues(size1, size2);
	dog.headValue = rollPhysicalValues(head1, head2);
	dog.bodyValue = rollPhysicalValues(body1, body2);
	dog.legsValue = rollPhysicalValues(legs1, legs2);
	dog.tailValue = rollPhysicalValues(tail1, tail2);
	dog.earsValue = rollPhysicalValues(ears1, ears2);
	dog.eyesValue = rollPhysicalValues(eyes1, eyes2);
	dog.furValue = rollPhysicalValues(fur1, fur2);
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

	if (!dog1.colorGenes || !dog2.colorGenes || !dog1.otherGenes || !dog2.otherGenes) {
		//assign either 0 or 1 to each alele in each gene in colorGenes
		//make true recessives have a one in four chance of cropping up
		dog.colorGenes.g1a1 = Math.round(Math.random());
		dog.colorGenes.g1a2 = Math.round(Math.random());
		dog.colorGenes.g2a1 = Math.round(Math.random());
		dog.colorGenes.g2a2 = Math.round(Math.random());
		var random = Math.round(Math.random());
		dog.colorGenes.g3a1 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.colorGenes.g3a2 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.colorGenes.g4a1 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.colorGenes.g4a2 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.colorGenes.g5a1 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.colorGenes.g5a2 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.colorGenes.g6a1 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.colorGenes.g6a2 = random ? Math.round(Math.random()) : 1;
		dog.colorGenes.g7a1 = Math.round(Math.random());
		dog.colorGenes.g7a2 = Math.round(Math.random());
		random = Math.round(Math.random());
		dog.colorGenes.g8a1 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.colorGenes.g8a2 = random ? Math.round(Math.random()) : 1;

		//assign either 0 or 1 to each alele in each gene in otherGenes
		random = Math.round(Math.random());
		dog.otherGenes.g1a1 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.otherGenes.g1a2 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.otherGenes.g2a1 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.otherGenes.g2a2 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.otherGenes.g3a1 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.otherGenes.g3a2 = random ? Math.round(Math.random()) : 1;
		random = Math.round(Math.random());
		dog.otherGenes.g4a1 = random ? Math.round(Math.random()) : 1;
		dog.otherGenes.g4a2 = Math.round(Math.random());
		dog.otherGenes.g5a1 = Math.round(Math.random());
		dog.otherGenes.g5a2 = Math.round(Math.random());
		dog.otherGenes.g6a1 = Math.round(Math.random());
		dog.otherGenes.g6a2 = Math.round(Math.random());
	} else {
		breedDogs(dog, dog1.colorGenes, dog2.colorGenes, dog1.otherGenes, dog2.otherGenes);
	}

	if (dog1.skills && dog2.skills) {
		rollSkillValues(dog, dog1.skills, dog2.skills);
	} else {
		for (key in dog.skills) {
			dog.skills[key] = Math.ceil((Math.random() * 100) * 0.2);
		}
	}

	dog = colorGen(dog);
	dog = otherGen(dog);
	console.log("dogGen end");
	return dog;
}

function breedDogs(dog, colors1, colors2, others1, others2) {
	for (key in dog.colorGenes) {
		var random = Math.round(Math.random());
		if (random) {
			dog.colorGenes[key] = colors1[key];
		} else {
			dog.colorGenes[key] = colors2[key];
		}
	}
	for (key in dog.otherGenes) {
		var random = Math.round(Math.random());
		if (random) {
			dog.otherGenes[key] = others1[key];
		} else {
			dog.otherGenes[key] = others2[key];
		}
	}
	return dog;
}

function rollPhysicalValues(one, two) {
	console.log('Roll Physics started');
	var value = 0;
	if (one >= two) {
		if ((one - two) < 2) {
			one++;
			two--;
			if (one > 10)
				one = 10;
			if (two < 1)
				two = 1;
		}
		do {
			value = Math.floor(Math.random() * 10) + 1;
			console.log('roll! one is ' + one + ' and two is ' + two + '. Value is ' + value);
		} while ((value > one) || (value < two))
		return value;
	} else {
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
			console.log('roll! one is ' + one + ' and two is ' + two + '. Value is ' + value);
		} while ((value < one) || (value > two))
		return value;
	}
}

function rollSkillValues(dog, one, two) {
	var percent;
	var third;
	for (key in dog) {
		if (one[key] > two[key]) {
			percent = one[key] / 100;
			third = two[key] / 3;
			dog.skills[key] = Math.ceil((Math.random() * 100) * percent) + Math.floor(third);
		} else {
			percent = two[key] / 100;
			third = one[key] / 3;
			dogs.skills[key] = Math.ceil((Math.random() * 100) * percent) + Math.floor(third);
		}
	}
}

//create color generater - to be used inside dogGen and puppyGen to generate the string value of the genetic code for color of the dog
function colorGen(dog) {
	console.log("colorGen start");

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
	if (dog.colorGenes.g1a1 && dog.colorGenes.g1a2) {
		dog.color = "Wolf Sable";
	} else if (dog.colorGenes.g1a1 || dog.colorGenes.g1a2) {
		dog.color = "Sable";
	} else {
		//checking color only first
		//check if point color masks regular color
		if (!dog.colorGenes.g8a1 && !dog.colorGenes.g8a2) {
			//if it does, check if dilute is present
			if (dog.colorGenes.g5a1 || dog.colorGenes.g5a2) {
				//if it isn't, check the point color
				if (dog.colorGenes.g7a1 && dog.colorGenes.g7a2) {
					//if homozygous dominant, color is red
					dog.color = "Red";
				} else if (dog.colorGenes.g7a1 || dog.colorGenes.g7a2) {
					//if heterozygous, color is Tan, shown as Fawn
					dog.color = "Fawn";
				} else {
					//if homozygous recessive, color is Brindle
					dog.color = "Brindle";
				}
			} else {
				//if it is, check the point color
				if (dog.colorGenes.g7a1 && dog.colorGenes.g7a2) {
					//if dilute and homozygous dominant, color is Cream
					dog.color = "Cream";
				} else if (dog.colorGenes.g7a1 || dog.colorGenes.g7a2) {
					//if dilute and heterozygous, color is Silver
					dog.color = "Silver";
				} else {
					//if dilute and homozygous recessive, color is Silver Brindle
					dog.color = "Silver Brindle";
				}
			}
		} else {
			//if point color does not mask, check chocolate gene
			if (!dog.colorGenes.g4a1 && !dog.colorGenes.g4a2) {
				//if chocolate is present, check for dilute
				if (!dog.colorGenes.g5a1 && !dog.colorGenes.g5a2) {
					//if dilute and chocolate
					dog.color = "Isabella";
				} else {
					//if no dilute and chocolate
					dog.color = "Chocolate";
				}
			} else {
				//if chocolate is not present, check for dilute
				if (!dog.colorGenes.g5a1 && !dog.colorGenes.g5a2) {
					//if dilute and black
					dog.color = "Blue";
				} else {
					//if no dilute and black
					dog.color = "Black";
				}
			}
		}

		//checking pattern only, adding to color string
		//check for merle, gene3
		if (!dog.colorGenes.g3a1 && !dog.colorGenes.g3a2) {
			//if merle is present, add merle
			dog.color += ' Merle';
		}

		//check gene2, Solid vs Irish vs Piebald
		if(dog.colorGenes.g2a1 && dog.colorGenes.g2a2) {
			dog.color += ' (Solid)';
		} else if (dog.colorGenes.g2a1 || dog.colorGenes.g2a2) {
			dog.color += ' and White (Irish)';
		} else {
			dog.color += ' and White (Piebald)';
		}

		//check gene6, points or no points
		//first check if points mask color
		if (dog.colorGenes.g8a1 || dog.colorGenes.g8a2) {
		//if points do not mask, then allow points
			if (!dog.colorGenes.g6a1 && !dog.colorGenes.g6a2) {
				//if points, check if dilute
				if (dog.colorGenes.g5a1 || dog.colorGenes.g5a2) {
					//if no dilute, check points color
					if (dog.colorGenes.g7a1 && dog.colorGenes.g7a2) {
						dog.color += ' with Red Points';
					} else if (dog.colorGenes.g7a1 || dog.colorGenes.g7a2) {
						dog.color += ' wiht Tan Points';
					} else {
						dog.color += ' with Brindle Points';
					}
				} else {
					//if dilute, check points color
					if (dog.colorGenes.g7a1 && dog.colorGenes.g7a2) {
						dog.color += ' with Cream Points';
					} else if (dog.colorGenes.g7a1 || dog.colorGenes.g7a2) {
						dog.color += ' with Silver Points';
					} else {
						dog.color += ' with Silver Brindle Points';
					}
				}
			}
		}
	}
	console.log("colorGen end");
	return dog;
}

//create other genetics generator - to be used after colorGen to change certain trait's string value if the dog has certain recessive traits
function otherGen(dog) {
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
	if (!dog.otherGenes.g2a1 && !dog.otherGenes.g2a2) {
		dog.tail = 'Curly';
	} else {
		if (!dog.otherGenes.g1a1 && !dog.otherGenes.g1a2) {
			dog.tail = 'Nub';
		}
	}

	//check if drop ears are present. If so, check if they are tiny. If so, ears are button. If not, ears are drop
	if (!dog.otherGenes.g3a1 && !dog.otherGenes.g3a2) {
		if (dog.ears === 'Tiny') {
			dog.ears = 'Button';
		} else {
			dog.ears = 'Drop';
		}
	}

	//check if drop coat and wire coat are both present. If so, coat is curly. If not, check if drop coat or wire coat is present. 
	//If neither, check if hairless is present
	if ((!dog.otherGenes.g4a1 && !dog.otherGenes.g4a2) && (!dog.otherGenes.g5a1 && !dog.otherGenesg5a2)) {
		dog.fur = 'Curly';
	} else if (!dog.otherGenes.g4a1 && !dog.otherGenes.g4a2) {
		dog.fur = 'Drop Coat';
		console.log('drop coat');
	} else if (!dog.otherGenes.g5a1 && !dog.otherGenes.g5a2) {
		dog.fur = 'Wire';
		console.log('wire hair');
	} else {
		if (!dog.otherGenes.g6a1 && !dog.otherGenes.g6a2) {
			dog.fur = 'Hairless';
		}
	}
	console.log('otherGen end');
	return dog;
}

//rerun colorGen and otherGen to update the string values after changes to the genes
function recheckGen(dog) {
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

	dog = colorGen(dog);
	dog = otherGen(dog);
	return dog;
}

//removes the possibility of breed-only traits showing in random, non-bred dogs
function removeRecessive(dog) {
	console.log('remove recessive started');
	//check for merle and continue retrying until it has at least one dominant alele
	while (!dog.colorGenes.g3a1 && !dog.colorGenes.g3a2) {
		console.log('merle recessive showing');
		dog.colorGenes.g3a1 = Math.round(Math.random());
		dog.colorGenes.g3a2 = Math.round(Math.random());
		if (dog.colorGenes.g3a1 || dog.colorGenes.g3a2) {
			console.log('merle recessive changed');
		}
	}

	//check for chocolate and continue retrying until it has at least one dominant alele
	while (!dog.colorGenes.g4a1 && !dog.colorGenes.g4a2) {
		console.log('chocolate recessive showing');
		dog.colorGenes.g4a1 = Math.round(Math.random());
		dog.colorGenes.g4a2 = Math.round(Math.random());
		if (dog.colorGenes.g4a1 || dog.colorGenes.g4a2) {
			console.log('chocolate recessive changed');
		}
	}

	//check for dilute and continue retrying until it has at least one dominant alele
	while (!dog.colorGenes.g5a1 && !dog.colorGenes.g5a2) {
		console.log('dilute recessive showing');
		dog.colorGenes.g5a1 = Math.round(Math.random());
		dog.colorGenes.g5a2 = Math.round(Math.random());
		if (dog.colorGenes.g5a1 || dog.colorGenes.g5a2) {
			console.log('dilute recessive changed');
		}
	}

	//check for show points and continue retrying until it has at least one dominant alele
	while (!dog.colorGenes.g6a1 && !dog.colorGenes.g6a2) {
		console.log('points recessive showing');
		dog.colorGenes.g6a1 = Math.round(Math.random());
		dog.colorGenes.g6a2 = Math.round(Math.random());
		if (dog.colorGenes.g6a1 || dog.colorGenes.g6a2) {
			console.log('points recessive changed');
		}
	}

	//check for points masking and continue retrying until it has at least one dominant alele
	while (!dog.colorGenes.g8a1 && !dog.colorGenes.g8a2) {
		console.log('points masking recessive showing');
		dog.colorGenes.g8a1 = Math.round(Math.random());
		dog.colorGenes.g8a2 = Math.round(Math.random());
		if (dog.colorGenes.g8a1 || dog.colorGenes.g8a2) {
			console.log('points masking recessive changed');
		}
	}

	//check for nub tail and continue retrying until it has at least one dominant alele
	while (!dog.otherGenes.g1a1 && !dog.otherGenes.g1a2) {
		console.log('nub tail recessive showing');
		dog.otherGenes.g1a1 = Math.round(Math.random());
		dog.otherGenes.g1a2 = Math.round(Math.random());
		if (dog.otherGenes.g1a1 || dog.otherGenes.g1a2) {
			console.log('nub tail recessive changed');
		}
	}

	//check for curly tail and continue retrying until it has at least one dominant alele
	while (!dog.otherGenes.g2a1 && !dog.otherGenes.g2a2) {
		console.log('curly tail recessive showing');
		dog.otherGenes.g2a1 = Math.round(Math.random());
		dog.otherGenes.g2a2 = Math.round(Math.random());
		if (dog.otherGenes.g2a1 || dog.otherGenes.g2a2) {
			console.log('curly tail recessive changed');
		}
	}

	//check for drop ears and continue retrying until it has at least one dominant alele
	while (!dog.otherGenes.g3a1 && !dog.otherGenes.g3a2) {
		console.log('drop ears recessive showing');
		dog.otherGenes.g3a1 = Math.round(Math.random());
		dog.otherGenes.g3a2 = Math.round(Math.random());
		if (dog.otherGenes.g3a1 || dog.otherGenes.g3a2) {
			console.log('drop ears recessive changed');
		}
	}

	//check for drop coat and continue retrying until it has at least one dominant alele
	while (!dog.otherGenes.g4a1 && !dog.otherGenes.g4a2) {
		console.log('drop coat recessive showing');
		dog.otherGenes.g4a1 = Math.round(Math.random());
		dog.otherGenes.g4a2 = Math.round(Math.random());
		if (dog.otherGenes.g4a1 || dog.otherGenes.g4a2) {
			console.log('drop coat recessive changed');
		}
	}

	//check for wire coat and continue retrying until it has at least one dominant alele
	while (!dog.otherGenes.g5a1 && !dog.otherGenes.g5a2) {
		console.log('wire coat recessive showing');
		dog.otherGenes.g5a1 = Math.round(Math.random());
		dog.otherGenes.g5a2 = Math.round(Math.random());
		if (dog.otherGenes.g5a1 || dog.otherGenes.g5a2) {
			console.log('wire coat recessive changed');
		}
	}

	//check for hairless and continue retrying until it has at least one dominant alele
	while (!dog.otherGenes.g6a1 && !dog.otherGenes.g6a2) {
		console.log('hairless recessive showing');
		dog.otherGenes.g6a1 = Math.round(Math.random());
		dog.otherGenes.g6a2 = Math.round(Math.random());
		if (dog.otherGenes.g6a1 || dog.otherGenes.g6a2) {
			console.log('hairless recessive changed');
		}
	}

	//rerun colorGen and otherGen to change the string value of the new genes
	dog = recheckGen(dog);

	console.log('remove recessive ended');
	return dog;
}

//allows certain traits
function allowRecessive(dog) {
	//allows chocolate and points the chance to show
	var random = Math.round(Math.random());
	dog.colorGenes.g4a1 = random ? Math.round(Math.random()) : 1;
	random = Math.round(Math.random());
	dog.colorGenes.g4a2 = random ? Math.round(Math.random()) : 1;
	random = Math.round(Math.random());
	dog.colorGenes.g6a1 = random ? Math.round(Math.random()) : 1;
	random = Math.round(Math.random());
	dog.colorGenes.g6a2 = random ? Math.round(Math.random()) : 1;
	dog = recheckGen(dog);
	return dog;
}

//list all current dogs
function listDogs() {
	$('#dogList').html('');
	for (i = 0; i < dogCount; i++) {
		if (ownedDogs[i]) {
			$('#dogList').append('<button type="button" id="showDog' + i + '" class="btn btn-info btn-lg">' + ownedDogs[i].name + '</button>');
			showDogButtonFill(i);
		}
	}
}

//gives a string value to age - # years # months
function ageValue(dog) {
	var years = Math.floor(dog.ageValue / 12);
	var months = dog.ageValue % 12;
	if (!dog.ageValue) {
		dog.age = '0 years and 0 months';
	} else {
		dog.age = '' + years + (years === 1 ? ' year ' : ' years ') + months + (months === 1 ? ' month' : ' months');
	}
	return dog;
}

//gives a string value of 'Female' or 'Male'
function genderValue(dog) {
	if (dog.genderValue) {
		dog.gender = 'Female';
	} else {
		dog.gender = 'Male';
	}
}

function addDog(dog) {
	return dog;
}

function breedDogButtonFill(i, gender) {
	$('#breedDog' + i).on('click', function() {
		if (gender) {
			fBreeder = 1;
			$('#femaleChoice').html('<button type="button" id="femaleDogChoice" class="btn btn-info btn-lg" value="' + i + '">' + ownedDogs[i].name + '</button>');
		} else {
			mBreeder = 1;
			$('#maleChoice').html('<button type="button" id="maleDogChoice" class="btn btn-info btn-lg" value="' + i + '">' + ownedDogs[i].name + '</button>');
		}

		if ((fBreeder + mBreeder) === 2) {
			$('#maleChoice').after('<button type="button" id="breedChosenPair" class="btn btn-success btn-lg">Breed Pair</button>');
			$('#breedChosenPair').on('click', function() {
				console.log('breeding started')
				f = $('#femaleDogChoice').val();
				m = $('#maleDogChoice').val();
				$('#currentOption').html('');
				var random = Math.round((Math.round(Math.random() * 10) + 1) / 2);
				for (var x = 0; x <= random; x++) {
					tempPuppy[x] = dogGen(ownedDogs[f].sizeValue, ownedDogs[m].sizeValue, ownedDogs[f].headValue, ownedDogs[m].headValue, ownedDogs[f].bodyValue, ownedDogs[m].bodyValue, ownedDogs[f].legsValue, ownedDogs[m].legsValue, ownedDogs[f].tailValue, ownedDogs[m].tailValue, ownedDogs[f].earsValue, ownedDogs[m].earsValue, ownedDogs[f].eyesValue, ownedDogs[m].eyesValue, ownedDogs[f].furValue, ownedDogs[m].furValue, ownedDogs[f], ownedDogs[m]);
					tempPuppy[x].age = 0;
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
						'</div></div><center><button type="button" id="puppy' + x + '" style="margin-bottom: 20px;" class="btn btn-success btn-lg">Keep Puppy ' + (x + 1) + '</button>');

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
				ownedDogs[dogCount] = tempPuppy[x];
				dogCount++;
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
		ageValue(ownedDogs[x]);
		$('#currentDog').html('<center><div style="width: 100%; margin: 0 auto;" class="alert alert-success alert-lg dogLongCells center"><strong>' + ownedDogs[x].name + '</strong></div></center>\
			<div class="row"><div class="alert alert-info dogCells"><strong>Size:</strong> ' + ownedDogs[x].size + 
			'</div><div class="alert alert-info dogCells"><strong>Head:</strong> ' + ownedDogs[x].head + 
			'</div><div class="alert alert-info dogCells"><strong>Body:</strong> ' + ownedDogs[x].body + 
			'</div><div class="alert alert-info dogCells"><strong>Legs:</strong> ' + ownedDogs[x].legs +
			'</div></div><div class="row"><div class="alert alert-info dogCells"><strong>Tail:</strong> ' + ownedDogs[x].tail + 
			'</div><div class="alert alert-info dogCells"><strong>Ears:</strong> ' + ownedDogs[x].ears + 
			'</div><div class="alert alert-info dogCells"><strong>Eyes:</strong> ' + ownedDogs[x].eyes + 
			'</div><div class="alert alert-info dogCells"><strong>Fur:</strong> ' + ownedDogs[x].fur + 
			'</div></div><div class="row"><div class="alert alert-info dogHalfCells"><strong>Gender:</strong> ' + ownedDogs[x].gender +
			'</div><div class="alert alert-info dogHalfCells"><strong>Age:</strong> ' + ownedDogs[x].age + 
			'</div></div><div class="row"><div class="alert alert-info dogLongCells"><strong>Color:</strong> ' + ownedDogs[x].color + 
			'</div></div>');
		addDogButtons(x);
	})
}

function addDogButtons(x) {
	$('#currentDog').append('<div id="dogButtons" class="inline center"></div>');
		$('#dogButtons').html('<button type="button" id="myCompanionDog" class="btn btn-success btn-lg inline">Make this dog my companion</button>');
		$('#myCompanionDog').on('click', function() {
			companionDog = ownedDogs[x];
		})
		$('#dogButtons').append('<button type="button" id="releaseDog" class="btn btn-danger btn-lg inline">Release Dog</button>');
		$('#releaseDog').on('click', function() {
			if (confirm('Are you sure you want to release this dog?')) {
				$('#alerts').append('<div id="dogReleased" class="alert alert-danger center">' + ownedDogs[x].name + ' has been released!');
				$('#currentDog').html('');
				ownedDogs[x] = null;
				listDogs();
			}
		})
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
		foundDog();
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
		for (i = 0; i < dogCount; i++) {
			if (ownedDogs[i]) {
				if (ownedDogs[i].ageValue >= 12) {
					if (ownedDogs[i].genderValue) {
						$('#femaleList').append('<button type="button" id="breedDog' + i + '" class="btn btn-info btn-lg">' + ownedDogs[i].name + '</button>');
						breedDogButtonFill(i, true);
					} else {
						$('#maleList').append('<button type="button" id="breedDog' + i + '" class="btn btn-info btn-lg">' + ownedDogs[i].name + '</button>');
						breedDogButtonFill(i, false);
					}
				}
			}
		}
		
	});
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
		'</div></div>');

	//give option to try to catch dog and remove previous option, if applicable
	$('#catchButton').remove();
	$('#optionList').append('<button type="button" id="catchButton" class="btn btn-info btn-lg">Catch</button>');

	//button for catch
	$('#catchButton').on('click', function() {
		//roll for a random number to see if the user catchs the dog
		var roll = Math.floor(Math.random() * 4) + 1;
		//if the roll was equal to the user's level or lower, the user catchs the dog
		if (roll <= userInfo.level) {
			//alert the user that they caught the dog
			$('#alerts').html('<div id="caught" class="alert alert-success center"><strong>Caught!</strong> You caught this dog!</div>');
			//get the user to name the new dog
			tempDog.name = prompt('Name your new dog!');
			//add the new dog to the owned Dog list
			ownedDogs[dogCount] = addDog(tempDog);
			//change the dog count to reflect the number of dogs the user has
			dogCount++;
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

//function to check if the starter female and starter male have been selected
function bothKept(f, m, nf, nm) {
	f += m;
	if (f === 2) {
		console.log("both have been kept");
		if (ownedDogs[0] === nf) {
			nameNewDogs(ownedDogs[0], ownedDogs[1]);
		} else {
			nameNewDogs(ownedDogs[1], ownedDogs[0]);
		}
		//clear the last dog picked from the screen
		$('#currentOption').html('');
		//continue the game
		gameContinue();
	}
}

//function to name starter pair
function nameNewDogs(female, male) {
	female.name = prompt("Name your new female:");
	male.name = prompt("Name your new male:");
	return [female, male];
}

//debug to allow save data to be loaded, if applicable
//console must be open for this to work
debugger;

//check if data was loaded
//if not, open the beginning prompts
if (!data) {
	//have you kept your first male or female
	var femaleKept = 0;
	var maleKept = 0;

	//change data's value to show that we now have save data
	data = 1;

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
			newFemale.colorGenes.g1a1 = 0;
			newFemale.colorGenes.g1a2 = 0;
			//remove any chance of rolling breed-only genes
			newFemale = removeRecessive(newFemale);
			//allows certain recessive genes to show in the first pair of dogs
			newFemale = allowRecessive(newFemale);

			//set the newFemale's age as 24 months/2 years
			newFemale.ageValue = 24;
			ageValue(newFemale);
			newFemale.genderValue = 1;
			genderValue(newFemale);

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
				'</div></div>');

			//checks to see if this is the first roll and, if so, adds a button to keep the current female
			if (femaleCount === 5) {
				$('#optionList').prepend('<button type="button" id="keepFemale" class="btn btn-info btn-lg">Keep Female</button>');
			}

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
				//adds the female to the users array of dogs
				ownedDogs[dogCount] = newFemale;
				//changes the dog count to reflect the new dog
				dogCount++;
				//changes the female roll alert to reflect that you've chosen your first female
				$('#femaleRolls').text('You\'ve chosen your first female!');
				$('#femaleRolls').removeClass('alert-warning alert-danger');
				$('#femaleRolls').addClass('alert-success');
				//changes the femaleKept variable to reflect that the female was kept
				femaleKept = 1;
				//run bothKept to check if both buttons have been clicked
				bothKept(femaleKept, maleKept, newFemale, newMale);
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
			newMale.colorGenes.g1a1 = 0;
			newMale.colorGenes.g1a2 = 0;
			//remove any chance of rolling breed-only genes
			newMale = removeRecessive(newMale);
			//allows certain recessive genes to show in the first pair of dogs
			newMale = allowRecessive(newMale);

			//set the newMale's age as 24 months/2 years
			newMale.ageValue = 24;
			ageValue(newMale);
			newMale.genderValue = 0;
			genderValue(newMale);

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
				'</div></div>');

			//checks to see if this is the first roll and, if so, adds a button to keep the current female
			if (maleCount === 5) {
				$('#optionList').append('<button type="button" id="keepMale" class="btn btn-info btn-lg">Keep Male</button>');
			}

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
				//add the current dog to the user's dog array
				ownedDogs[dogCount] = newMale;
				//change the dog count to reflect the user's number of dogs
				dogCount++;
				//changes the male rolls alert to reflect that a male has been chosen
				$('#maleRolls').text('You\'ve chosen your first male!');
				$('#maleRolls').removeClass('alert-warning alert-danger');
				$('#maleRolls').addClass('alert-success');
				//change the male kept variable to reflect that a male has been kept
				maleKept = 1;
				//run bothKept to check if both keep buttons have been clicked
				bothKept(femaleKept, maleKept, newFemale, newMale);
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