var numColors = 6;

// Function returns random integer between 0 and 255.
function randomRGBInt(){
	return Math.floor(Math.random()*256);
}

// Function returns random RGB color triplet.
function randomRGB(){
	var rgbArray = [];

	for(var i=0; i<3; i++){
		rgbArray.push(randomRGBInt());
	}

	return rgbArray;
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 *
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// Add "click" event listener to "EASY" button.
var easy = document.getElementById("easy");
easy.addEventListener("click", function(){
	numColors = 3;
	startGame();
	var row2 = document.getElementsByClassName("row2");
	for(var i=0; i<row2.length; i++){
		row2[i].style.display = "none";
	}
	var row3 = document.getElementsByClassName("row3");
	for(var i=0; i<row3.length; i++){
		row3[i].style.display = "none";
	}
	this.classList.add("selected");
	document.getElementById("hard").classList.remove("selected");
	document.getElementById("medium").classList.remove("selected");

});

// Add "click" event listener to "MEDIUM" button.
var medium = document.getElementById("medium");
medium.addEventListener("click", function(){
	numColors = 6;
	startGame();
	var row2 = document.getElementsByClassName("row2");
	for(var i=0; i<row2.length; i++){
		row2[i].style.display = "block";
	}
	var row3 = document.getElementsByClassName("row3");
	for(var i=0; i<row2.length; i++){
		row3[i].style.display = "none";
	}
	this.classList.add("selected");
	document.getElementById("hard").classList.remove("selected");
	document.getElementById("easy").classList.remove("selected");

});

// Add "click" event listener to "HARD" button.
var hard = document.getElementById("hard");
hard.addEventListener("click", function(){
	numColors = 9;
	startGame();
	var row2 = document.getElementsByClassName("row2");
	for(var i=0; i<row2.length; i++){
		row2[i].style.display = "block";
	}
	var row3 = document.getElementsByClassName("row3");
	for(var i=0; i<row3.length; i++){
		row3[i].style.display = "block";
	}
	this.classList.add("selected");
	document.getElementById("easy").classList.remove("selected");
	document.getElementById("medium").classList.remove("selected");

});

// Add "click" event listener to "RESTART" button.
var restart = document.getElementById("restart");
restart.addEventListener("click", function(){
	startGame();
});

// Initialize new game.
function startGame(){
	var sol = randomRGB(); // Get solution color.
	document.getElementById("title").style.backgroundColor = "rgb(50,100,200)";
	document.getElementById("restart").textContent = "New Colors";
	document.getElementById("message").innerHTML = "&nbsp;";
	var squares = document.getElementsByClassName("square");

	for(var i=0; i<numColors; i++){
		squares[i].classList.remove("vanish");
	}

	// Set title.
	var title = document.getElementById("titleRGB");
	title.textContent = "RGB(" + sol[0] + ", " + sol[1] + ", " + sol[2] + ")";

	// Create array of random colors plus solution color.
	var colors = [];
	colors.push(sol);
	for(var i=0; i<numColors-1; i++){
		colors.push(randomRGB());
	}

	colors = shuffleArray(colors);


	// Set background color of squares.
	for(var i=0; i<numColors; i++){
		squares[i].style.backgroundColor = "rgb(" + colors[i].join(',') + ")";
	}

	// Add "click" event listeners to squares.
	for(var i=0; i<numColors; i++){
		squares[i].addEventListener("click", function(){
			if(this.style.backgroundColor == title.textContent.toLowerCase()){
				document.getElementById("message").textContent = "Correct!";
				document.getElementById("restart").textContent = "Play Again?";

				// set all squares to same color
				for(var i=0; i<numColors; i++){
					squares[i].style.backgroundColor = this.style.backgroundColor;
					squares[i].classList.remove("vanish");
				}
				// set title background to same color
				document.getElementById("title").style.backgroundColor = this.style.backgroundColor;
			}
			else{
				//make invisible
				this.classList.add("vanish");
				document.getElementById("message").textContent = "Try Again!"
			}
		})
	}
}

startGame();
