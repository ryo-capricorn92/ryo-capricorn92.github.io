console.log("script.js start")

//declare variables
//variable to tell whether save data has been loaded
var data = 0;
//count for first female and male roll
var femaleCount = 5;
var maleCount = 5;
//create new male and female variables to hold new dogs
var newFemale;
var newMale;
//create an array to hold all the user's owned dogs
var ownedDogs = [];
//number to count how many dogs the user has - used to add new dogs to the ownedDogs array
var dogCount = 0;
//have you kept your first male or female
var femaleKept = 0;
var maleKept = 0;
//
var name1;
var name2;

//create dog constructor
function Dog(age, size, head, body, legs, tail, ears, eyes, fur, color, sizeValue, headValue, bodyValue, legsValue, tailValue, earsValue, eyesValue, furValue, colorValue, otherGenes) {
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
	this.colorValue = colorValue;
	this.otherGenes = otherGenes;
}

//create first newDog, minus colorValue
var newDog = new Dog('', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0);

//create newDog's colorValue object
newDog.colorValue = {
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

//create newDog's otherGenes object
newDog.otherGenes = {
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

//create dog generator
function dogGen(sizeTop, sizeBottom, headTop, headBottom, bodyTop, bodyBottom, legsTop, legsBottom, tailTop, tailBottom, earsTop, earsBottom, eyesTop, eyesBottom, furTop, furBottom) {
	console.log("dogGen start");
	//assign random numbers between 1 and 10 to all dog aspects minus colorValue
	newDog.sizeValue = Math.abs(Math.floor(Math.random() * sizeTop) + sizeBottom);
	newDog.headValue = Math.abs(Math.floor(Math.random() * headTop) + headBottom);
	newDog.bodyValue = Math.abs(Math.floor(Math.random() * bodyTop) + bodyBottom);
	newDog.legsValue = Math.abs(Math.floor(Math.random() * legsTop) + legsBottom);
	newDog.tailValue = Math.abs(Math.floor(Math.random() * tailTop) + tailBottom);
	newDog.earsValue = Math.abs(Math.floor(Math.random() * earsTop) + earsBottom);
	newDog.eyesValue = Math.abs(Math.floor(Math.random() * eyesTop) + eyesBottom);
	newDog.furValue = Math.abs(Math.floor(Math.random() * furTop) + furBottom);
	if (newDog.headValue || newDog.bodyValue || newDoglegsValue)
		console.log("dogGen random values filled");

	//check sizeValue's random number and assigns value to size
	switch(newDog.sizeValue) {
		case 1:
			newDog.size = 'Extra Small';
			break;
		case 2:
		case 3:
			newDog.size = 'Small';
			break;
		case 4:
		case 5:
		case 6:
		case 7:
			newDog.size = 'Medium';
			break;
		case 8:
		case 9:
			newDog.size = 'Large';
			break;
		case 10:
			newDog.size = 'Extra Large';
			break;
		default:
			newDog.size = 'ERROR';
			break;
	}

	//check headValue's random number and assigns value to head
	switch(newDog.headValue) {
		case 1:
		case 2:
		case 3:
			newDog.head = 'Slim';
			break;
		case 4:
		case 5:
		case 6:
		case 7:
			newDog.head = 'Average';
			break;
		case 8:
		case 9:
		case 10:
			newDog.head = 'Block';
			break;
		default:
			newDog.head = 'ERROR';
	}

	//check bodyValue's random number and assigns value to body
	switch(newDog.bodyValue) {
		case 1:
		case 2:
			newDog.body = 'Petite';
			break;
		case 3:
		case 4:
		case 5:
			newDog.body = 'Lean';
			break;
		case 6:
		case 7:
		case 8:
			newDog.body = 'Sturdy';
			break;
		case 9:
		case 10:
			newDog.body = 'Stocky';
			break;
		default:
			newDog.body = "ERROR";
			break;
	}

	//check legsValue's random number and assigns value to legs
	switch(newDog.legsValue) {
		case 1:
		case 2:
			newDog.legs = 'Stubby';
			break;
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
			newDog.legs = 'Average';
			break;
		case 8:
		case 9:
		case 10:
			newDog.legs = 'Long';
			break;
		default:
			newDog.legs = 'ERROR';
			break;
	}

	//check tailValue's random number and assigns value to tail
	switch(newDog.tailValue) {
		case 1:
		case 2:
		case 3:
			newDog.tail = 'Short';
			break;
		case 4:
		case 5:
		case 6:
			newDog.tail = 'Medium';
			break;
		case 7:
		case 8:
		case 9:
			newDog.tail = 'Long';
			break;
		case 10:
			newDog.tail = 'Flag';
			break;
		default:
			newDog.tail = 'ERROR';
			break;
	}

	//check earsValue's random number and assigns value to ears
	switch(newDog.earsValue) {
		case 1:
		case 2:
		case 3:
			newDog.ears = 'Tiny';
			break;
		case 4:
		case 5:
		case 6:
		case 7:
			newDog.ears = 'Average';
			break;
		case 8:
		case 9:
		case 10:
			newDog.ears = 'Large';
			break;
		default:
			newDog.ears = 'ERROR';
			break;
	}

	//check eyesValue's random number and assigns value to eyes
	switch(newDog.eyesValue) {
		case 1:
			newDog.eyes = 'Amber';
			break;
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
			newDog.eyes = 'Brown';
			break;
		case 7:
			newDog.eyes = 'Heterochromatic (Brown and Blue)';
			break;
		case 8:
		case 9:
		case 10:
			newDog.eyes = 'Blue';
			break;
		default:
			newDog.eyes = 'ERROR';
			break;
	}

	//check furValue's random number and assigns value to ears
	switch(newDog.furValue) {
		case 1:
		case 2:
		case 3:
			newDog.fur = 'Long';
			break;
		case 4:
		case 5:
		case 6:
		case 7:
			newDog.fur = 'Short';
			break;
		case 8:
		case 9:
		case 10:
			newDog.fur = 'Smooth';
			break;
		default:
			newDog.fur = 'ERROR';
			break;
	}

	//assign either 0 or 1 to each alele in each gene in colorValue
	newDog.colorValue.g1a1 = Math.round(Math.random());
	newDog.colorValue.g1a2 = Math.round(Math.random());
	newDog.colorValue.g2a1 = Math.round(Math.random());
	newDog.colorValue.g2a2 = Math.round(Math.random());
	newDog.colorValue.g3a1 = Math.round(Math.random());
	newDog.colorValue.g3a2 = Math.round(Math.random());
	newDog.colorValue.g4a1 = Math.round(Math.random());
	newDog.colorValue.g4a2 = Math.round(Math.random());
	newDog.colorValue.g5a1 = Math.round(Math.random());
	newDog.colorValue.g5a2 = Math.round(Math.random());
	newDog.colorValue.g6a1 = Math.round(Math.random());
	newDog.colorValue.g6a2 = Math.round(Math.random());
	newDog.colorValue.g7a1 = Math.round(Math.random());
	newDog.colorValue.g7a2 = Math.round(Math.random());
	newDog.colorValue.g8a1 = Math.round(Math.random());
	newDog.colorValue.g8a2 = Math.round(Math.random());

	//assign either 0 or 1 to each alele in each gene in otherGenes
	newDog.otherGenes.g1a1 = Math.round(Math.random());
	newDog.otherGenes.g1a2 = Math.round(Math.random());
	newDog.otherGenes.g2a1 = Math.round(Math.random());
	newDog.otherGenes.g2a2 = Math.round(Math.random());
	newDog.otherGenes.g3a1 = Math.round(Math.random());
	newDog.otherGenes.g3a2 = Math.round(Math.random());
	newDog.otherGenes.g4a1 = Math.round(Math.random());
	newDog.otherGenes.g4a2 = Math.round(Math.random());
	newDog.otherGenes.g5a1 = Math.round(Math.random());
	newDog.otherGenes.g5a2 = Math.round(Math.random());
	newDog.otherGenes.g6a1 = Math.round(Math.random());
	newDog.otherGenes.g6a2 = Math.round(Math.random());

	colorGen();
	otherGen();
	console.log("dogGen end");
}

//create color generater - to be used inside dogGen and puppyGen to generate the string value of the genetic code for color of the newDog
function colorGen() {
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
	if (newDog.colorValue.g1a1 && newDog.colorValue.g1a2) {
		newDog.color = "Wolf Sable";
	} else if (newDog.colorValue.g1a1 || newDog.colorValue.g1a2) {
		newDog.color = "Sable";
	} else {
		//checking color only first
		//check if point color masks regular color
		if (!newDog.colorValue.g8a1 && !newDog.colorValue.g8a2) {
			//if it does, check if dilute is present
			if (newDog.colorValue.g5a1 || newDog.colorValue.g5a2) {
				//if it isn't, check the point color
				if (newDog.colorValue.g7a1 && newDog.colorValue.g7a2) {
					//if homozygous dominant, color is red
					newDog.color = "Red";
				} else if (newDog.colorValue.g7a1 || newDog.colorValue.g7a2) {
					//if heterozygous, color is Tan, shown as Fawn
					newDog.color = "Fawn";
				} else {
					//if homozygous recessive, color is Brindle
					newDog.color = "Brindle";
				}
			} else {
				//if it is, check the point color
				if (newDog.colorValue.g7a1 && newDog.colorValue.g7a2) {
					//if dilute and homozygous dominant, color is Cream
					newDog.color = "Cream";
				} else if (newDog.colorValue.g7a1 || newDog.colorValue.g7a2) {
					//if dilute and heterozygous, color is Silver
					newDog.color = "Silver";
				} else {
					//if dilute and homozygous recessive, color is Silver Brindle
					newDog.color = "Silver Brindle";
				}
			}
		} else {
			//if point color does not mask, check chocolate gene
			if (!newDog.colorValue.g4a1 && !newDog.colorValue.g4a2) {
				//if chocolate is present, check for dilute
				if (!newDog.colorValue.g5a1 && !newDog.colorValue.g5a2) {
					//if dilute and chocolate
					newDog.color = "Isabella";
				} else {
					//if no dilute and chocolate
					newDog.color = "Chocolate";
				}
			} else {
				//if chocolate is not present, check for dilute
				if (!newDog.colorValue.g5a1 && !newDog.colorValue.g5a2) {
					//if dilute and black
					newDog.color = "Blue";
				} else {
					//if no dilute and black
					newDog.color = "Black";
				}
			}
		}

		//checking pattern only, adding to color string
		//check for merle, gene3
		if (!newDog.colorValue.g3a1 && !newDog.colorValue.g3a2) {
			//if merle is present, add merle
			newDog.color += ' Merle';
		}

		//check gene2, Solid vs Irish vs Piebald
		if(newDog.colorValue.g2a1 && newDog.colorValue.g2a2) {
			newDog.color += ' (Solid)';
		} else if (newDog.colorValue.g2a1 || newDog.colorValue.g2a2) {
			newDog.color += ' and White (Irish)';
		} else {
			newDog.color += ' and White (Piebald)';
		}

		//check gene6, points or no points
		//first check if points mask color
		if (newDog.colorValue.g8a1 || newDog.colorValue.g8a2) {
		//if points do not mask, then allow points
			if (!newDog.colorValue.g6a1 && !newDog.colorValue.g6a2) {
				//if points, check if dilute
				if (newDog.colorValue.g5a1 || newDog.colorValue.g5a2) {
					//if no dilute, check points color
					if (newDog.colorValue.g7a1 && newDog.colorValue.g7a2) {
						newDog.color += ' with Red Points';
					} else if (newDog.colorValue.g7a1 || newDog.colorValue.g7a2) {
						newDog.color += ' wiht Tan Points';
					} else {
						newDog.color += ' with Brindle Points';
					}
				} else {
					//if dilute, check points color
					if (newDog.colorValue.g7a1 && newDog.colorValue.g7a2) {
						newDog.color += ' with Cream Points';
					} else if (newDog.colorValue.g7a1 || newDog.colorValue.g7a2) {
						newDog.color += ' with Silver Points';
					} else {
						newDog.color += ' with Silver Brindle Points';
					}
				}
			}
		}
	}
	console.log("colorGen end");
}

//create other genetics generator - to be used after colorGen to change certain trait's string value if the dog has certain recessive traits
function otherGen() {
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
	if (!newDog.otherGenes.g2a1 && !newDog.otherGenes.g2a2) {
		newDog.tail = 'Curly';
	} else {
		if (!newDog.otherGenes.g1a1 && !newDog.otherGenes.g1a2) {
			newDog.tail = 'Nub';
		}
	}

	//check if drop ears are present. If so, check if they are tiny. If so, ears are button. If not, ears are drop
	if (!newDog.otherGenes.g3a1 && !newDog.otherGenes.g3a2) {
		if (newDog.ears === 'Tiny') {
			newDog.ears = 'Button';
		} else {
			newDog.ears = 'Drop';
		}
	}

	//check if drop coat and wire coat are both present. If so, coat is curly. If not, check if drop coat or wire coat is present. 
	//If neither, check if hairless is present
	if ((!newDog.otherGenes.g4a1 && !newDog.otherGenes.g4a2) && (!newDog.otherGenes.g5a1 && !newDog.otherGenesg5a2)) {
		newDog.fur = 'Curly';
	} else if (!newDog.otherGenes.g4a1 && !newDog.otherGenes.g4a2) {
		newDog.fur = 'Drop Coat';
		console.log('drop coat');
	} else if (!newDog.otherGenes.g5a1 && !newDog.otherGenes.g5a2) {
		newDog.fur = 'Wire';
		console.log('wire hair');
	} else {
		if (!newDog.otherGenes.g6a1 && !newDog.otherGenes.g6a2) {
			newDog.fur = 'Hairless';
		}
	}
	console.log('otherGen end');
}

function recheckGen() {
	//check tailValue's random number and assigns value to tail
	switch(newDog.tailValue) {
		case 1:
		case 2:
		case 3:
			newDog.tail = 'Short';
			break;
		case 4:
		case 5:
		case 6:
			newDog.tail = 'Medium';
			break;
		case 7:
		case 8:
		case 9:
			newDog.tail = 'Long';
			break;
		case 10:
			newDog.tail = 'Flag';
			break;
		default:
			newDog.tail = 'ERROR';
			break;
	}

	//check earsValue's random number and assigns value to ears
	switch(newDog.earsValue) {
		case 1:
		case 2:
		case 3:
			newDog.ears = 'Tiny';
			break;
		case 4:
		case 5:
		case 6:
		case 7:
			newDog.ears = 'Average';
			break;
		case 8:
		case 9:
		case 10:
			newDog.ears = 'Large';
			break;
		default:
			newDog.ears = 'ERROR';
			break;
	}

	//check furValue's random number and assigns value to ears
	switch(newDog.furValue) {
		case 1:
		case 2:
		case 3:
			newDog.fur = 'Long';
			break;
		case 4:
		case 5:
		case 6:
		case 7:
			newDog.fur = 'Short';
			break;
		case 8:
		case 9:
		case 10:
			newDog.fur = 'Smooth';
			break;
		default:
			newDog.fur = 'ERROR';
			break;
	}

	colorGen();
	otherGen();
}

//removes the possibility of breed-only traits showing in random, non-bred dogs
function removeRecessive() {
	console.log('remove recessive started');
	//check for merle and continue retrying until it has at least one dominant alele
	while (!newDog.colorValue.g3a1 && !newDog.colorValue.g3a2) {
		console.log('merle recessive showing');
		newDog.colorValue.g3a1 = Math.round(Math.random());
		newDog.colorValue.g3a2 = Math.round(Math.random());
		if (newDog.colorValue.g3a1 || newDog.colorValue.g3a2) {
			console.log('merle recessive changed');
		}
	}

	//check for chocolate and continue retrying until it has at least one dominant alele
	while (!newDog.colorValue.g4a1 && !newDog.colorValue.g4a2) {
		console.log('chocolate recessive showing');
		newDog.colorValue.g4a1 = Math.round(Math.random());
		newDog.colorValue.g4a2 = Math.round(Math.random());
		if (newDog.colorValue.g4a1 || newDog.colorValue.g4a2) {
			console.log('chocolate recessive changed');
		}
	}

	//check for dilute and continue retrying until it has at least one dominant alele
	while (!newDog.colorValue.g5a1 && !newDog.colorValue.g5a2) {
		console.log('dilute recessive showing');
		newDog.colorValue.g5a1 = Math.round(Math.random());
		newDog.colorValue.g5a2 = Math.round(Math.random());
		if (newDog.colorValue.g5a1 || newDog.colorValue.g5a2) {
			console.log('dilute recessive changed');
		}
	}

	//check for show points and continue retrying until it has at least one dominant alele
	while (!newDog.colorValue.g6a1 && !newDog.colorValue.g6a2) {
		console.log('points recessive showing');
		newDog.colorValue.g6a1 = Math.round(Math.random());
		newDog.colorValue.g6a2 = Math.round(Math.random());
		if (newDog.colorValue.g6a1 || newDog.colorValue.g6a2) {
			console.log('points recessive changed');
		}
	}

	//check for points masking and continue retrying until it has at least one dominant alele
	while (!newDog.colorValue.g8a1 && !newDog.colorValue.g8a2) {
		console.log('points masking recessive showing');
		newDog.colorValue.g8a1 = Math.round(Math.random());
		newDog.colorValue.g8a2 = Math.round(Math.random());
		if (newDog.colorValue.g8a1 || newDog.colorValue.g8a2) {
			console.log('points masking recessive changed');
		}
	}

	//check for nub tail and continue retrying until it has at least one dominant alele
	while (!newDog.otherGenes.g1a1 && !newDog.otherGenes.g1a2) {
		console.log('nub tail recessive showing');
		newDog.otherGenes.g1a1 = Math.round(Math.random());
		newDog.otherGenes.g1a2 = Math.round(Math.random());
		if (newDog.otherGenes.g1a1 || newDog.otherGenes.g1a2) {
			console.log('nub tail recessive changed');
		}
	}

	//check for curly tail and continue retrying until it has at least one dominant alele
	while (!newDog.otherGenes.g2a1 && !newDog.otherGenes.g2a2) {
		console.log('curly tail recessive showing');
		newDog.otherGenes.g2a1 = Math.round(Math.random());
		newDog.otherGenes.g2a2 = Math.round(Math.random());
		if (newDog.otherGenes.g2a1 || newDog.otherGenes.g2a2) {
			console.log('curly tail recessive changed');
		}
	}

	//check for drop ears and continue retrying until it has at least one dominant alele
	while (!newDog.otherGenes.g3a1 && !newDog.otherGenes.g3a2) {
		console.log('drop ears recessive showing');
		newDog.otherGenes.g3a1 = Math.round(Math.random());
		newDog.otherGenes.g3a2 = Math.round(Math.random());
		if (newDog.otherGenes.g3a1 || newDog.otherGenes.g3a2) {
			console.log('drop ears recessive changed');
		}
	}

	//check for drop coat and continue retrying until it has at least one dominant alele
	while (!newDog.otherGenes.g4a1 && !newDog.otherGenes.g4a2) {
		console.log('drop coat recessive showing');
		newDog.otherGenes.g4a1 = Math.round(Math.random());
		newDog.otherGenes.g4a2 = Math.round(Math.random());
		if (newDog.otherGenes.g4a1 || newDog.otherGenes.g4a2) {
			console.log('drop coat recessive changed');
		}
	}

	//check for wire coat and continue retrying until it has at least one dominant alele
	while (!newDog.otherGenes.g5a1 && !newDog.otherGenes.g5a2) {
		console.log('wire coat recessive showing');
		newDog.otherGenes.g5a1 = Math.round(Math.random());
		newDog.otherGenes.g5a2 = Math.round(Math.random());
		if (newDog.otherGenes.g5a1 || newDog.otherGenes.g5a2) {
			console.log('wire coat recessive changed');
		}
	}

	//check for hairless and continue retrying until it has at least one dominant alele
	while (!newDog.otherGenes.g6a1 && !newDog.otherGenes.g6a2) {
		console.log('hairless recessive showing');
		newDog.otherGenes.g6a1 = Math.round(Math.random());
		newDog.otherGenes.g6a2 = Math.round(Math.random());
		if (newDog.otherGenes.g6a1 || newDog.otherGenes.g6a2) {
			console.log('hairless recessive changed');
		}
	}

	//rerun colorGen and otherGen to change the string value of the new genes
	recheckGen();

	console.log('remove recessive ended');
}

//function to check if the starter female and starter male have been selected
function bothKept(f, m) {
	f += m;
	if (f === 2) {
		console.log("both have been kept");
		console.log(newFemale.name + " " + newMale.name);
		console.log(name1 + " " + name2);
		
	}
}

//debug to allow save data to be loaded, if applicable
//console must be open for this to work
debugger;

//check if data was loaded
//if not, open the beginning prompts
if (!data) {

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
			//run dog gen with all physical features possible
			dogGen(10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1);
			//remove the possibility of sable and wolf sable
			newDog.colorValue.g1a1 = 0;
			newDog.colorValue.g1a2 = 0;
			//remove any chance of rolling breed-only genes
			removeRecessive();
			//allows certain recessive genes to show in the first pair of dogs


			newFemale = newDog;
			newFemale.age = 24;
			newFemale.gender = 1;

			//show the currently rolled dog
			$('#currentOption').html('<div class="row"><div class="alert alert-info dogCells"><strong>Size:</strong> ' + newDog.size + 
				'</div><div class="alert alert-info dogCells"><strong>Head:</strong> ' + newDog.head + 
				'</div><div class="alert alert-info dogCells"><strong>Body:</strong> ' + newDog.body + 
				'</div><div class="alert alert-info dogCells"><strong>Legs:</strong> ' + newDog.legs +
				'</div></div><div class="row"><div class="alert alert-info dogCells"><strong>Tail:</strong> ' + newDog.tail + 
				'</div><div class="alert alert-info dogCells"><strong>Ears:</strong> ' + newDog.ears + 
				'</div><div class="alert alert-info dogCells"><strong>Eyes:</strong> ' + newDog.eyes + 
				'</div><div class="alert alert-info dogCells"><strong>Fur:</strong> ' + newDog.fur + 
				'</div></div><div class="row"><div class="alert alert-info dogLongCells"><strong>Color:</strong> ' + newDog.color + 
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
				//removes any remaining rolls
				femaleCount = 0;
				//adds the female to the users array of dogs
				ownedDogs[0] = newFemale;
				//prompt the user to name their new dog
				newFemale.name = prompt("Name your new female:");
				//changes the dog count to reflect the new dog
				dogCount++;
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
			dogGen(10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1);
			//remove the possibility of sable and wolf sable
			newDog.colorValue.g1a1 = 0;
			newDog.colorValue.g1a2 = 0;
			colorGen();
			//remove any chance of rolling breed-only genes
			removeRecessive();
			//allows certain recessive genes to show in the first pair of dogs

			//sets newMale equal to the current dog roll
			newMale = newDog;
			//set the newMale's age as 24 months/2 years
			newMale.age = 24;
			newMale.gender = 0;

			//show the currently rolled dog
			$('#currentOption').html('<div class="row"><div class="alert alert-info dogCells"><strong>Size:</strong> ' + newDog.size + 
				'</div><div class="alert alert-info dogCells"><strong>Head:</strong> ' + newDog.head + 
				'</div><div class="alert alert-info dogCells"><strong>Body:</strong> ' + newDog.body + 
				'</div><div class="alert alert-info dogCells"><strong>Legs:</strong> ' + newDog.legs +
				'</div></div><div class="row"><div class="alert alert-info dogCells"><strong>Tail:</strong> ' + newDog.tail + 
				'</div><div class="alert alert-info dogCells"><strong>Ears:</strong> ' + newDog.ears + 
				'</div><div class="alert alert-info dogCells"><strong>Eyes:</strong> ' + newDog.eyes + 
				'</div><div class="alert alert-info dogCells"><strong>Fur:</strong> ' + newDog.fur + 
				'</div></div><div class="row"><div class="alert alert-info dogLongCells"><strong>Color:</strong> ' + newDog.color + 
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
				ownedDogs[1] = newMale;
				//prompt the user to name their new dog
				newMale.name = prompt("Name your new male:");
				//change the dog count to reflect the user's number of dogs
				dogCount++;
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
}