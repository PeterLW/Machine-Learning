//movies recommendation system with KNN


var data;
var users;

// var dropdown1;
// var dropdown2;
var dropdown = [];
var button;

var resultP;
var div = [];

function preload(){
	data = loadJSON("movies.json");
}

function setup() {
	// createCanvas(windowWidth, windowHeight);
	// background(150);
	noCanvas();

	// users_lookup = {};
	// dropdown1 = createSelect('');

	// for(let i = 0; i < data.users.length; i++){
	// 	// console.log(users[i].name);
	// 	let name = data.users[i].name;
	// 	dropdown1.option(name);
	// 	users_lookup[name] = data.users[i];
	// }

	var titles = data.titles;
	// console.log(titles)
	for(let i = 0; i < titles.length; i++){
		var div = createDiv(titles[i]);
		dropdown[i] = createSelect('');
		dropdown[i].parent(div);

		dropdown[i].title = (titles[i])
		dropdown[i].option("Not Seen")
		for(let star = 1; star < 6; star++){
			dropdown[i].option(star);
		}
	}



	button = createButton("Submit");
	button.mousePressed(predict_rating);

	resultP = createP("");

}

function draw() {

}

function predict_rating(){

	var newUser = {}
	for(let i = 0; i < dropdown.length; i++){
		var title = dropdown[i].title;
		var rating = dropdown[i].value();
		if(rating == "Not Seen"){
			rating = null;
		}
		newUser[title] = rating;
	}
	// console.log(newUser)
	findNearestNeighbors(newUser);
}

// var similarityScores = [];
function findNearestNeighbors(user){

	for(let i = 0; i < div.length; i++){
			div[i].remove();
	}
	div = [];

	var users = data.users;

	var similarityScores = {};
	for(let i = 0; i < users.length; i++){
		var similarity;
		var other = users[i];
		similarity = euclideanDistance(user, other);

		users[i].similarity = similarity;
		similarityScores[other.name] = similarity;
	}

	users.sort(compareSimilarity);

	function compareSimilarity(a, b) {
	let score1 = similarityScores[a.name];
	let score2 = similarityScores[b.name];
	return score2 - score1;
 }

	var titles = data.titles;
	for(let i = 0; i < titles.length; i++){
		let title = titles[i];
		let rating = user[title];
		if(rating == null){
			let weighted_sum = 0;
			let similarity_sum = 0;
			for(let j = 0; j < 5; j++){
				if(users[j][title] != null)
					weighted_sum = weighted_sum + users[j][title] * users[j].similarity;
					similarity_sum = similarity_sum + users[j].similarity;
					// console.log(users[j].similarity);
			}
			//weighted average
			user[title] = nf(weighted_sum / similarity_sum, 1, 2);
		}
	}

	//display
	for(let i = 0; i < titles.length; i++){
			div[i] = createDiv(titles[i] + ": " + user[titles[i]]);
			div[i].parent(resultP);
	}

}


function euclideanDistance(ratings1, ratings2){

	// var ratings1 = users_lookup[name1];
	// var ratings2 = users_lookup[name2];

	var titles = data.titles;
	// titles.splice(titles.indexOf('name'), 1);
	// titles.splice(titles.indexOf('timestamp'), 1);
	// console.log(titles);

	var sum_squares = 0;
	for(let i = 0; i < titles.length; i++){
		let rating1 = ratings1[titles[i]];
		let rating2 = ratings2[titles[i]];

		if(rating1 != null && rating2 != null){
			var difference = rating1 - rating2;
			sum_squares = sum_squares + pow(difference, 2);
		}
	}
	var result = sqrt(sum_squares);

	return similarity = 1/(result + 1);
}






//
