// Hide anything necessary with jQuery
$(document).ready(function hideGuess() {
  $(".letters").hide();
  //Loads background with jQuery to smoothly reload it
  //after game dynamically generates divs, thus avoiding formatting errors
  // encountered previously with our flex box container
  $(".container").css({"background-image": "url('https://wildcat510.github.io/images/zenkoan1.png')", "background-size": "cover", "background-repeat": "no-repeat"});
});

//Get empty divs to give data to
var userGuess = document.getElementById("user-guess");
var wordStage = document.getElementById("stage");
var remainingGuesses = document.getElementById("remaining-guesses");
var guessCount = 20;
var alreadyGuessed = [];
var winCount = 0;

var init = false;
//Array to hold HTML iterations of each letter to be rendered on the page
var wordDisplay = [];

//Array which will accept randomly generated words split into 1 letter per index
//for later evaluation against the keystroke event
var currentword = [];

//Collection of words for game
var dictionary = [
  "Rainfall",
  // "Wildcat",
  // "Mythic",
  // "Crystal",
  // "Fragrant",
  // "Petrichor",
  // "Rain",
  // "Winter",
  // "Freestyle",
  // "Gothic",
  // "Modulus"
];

//Stores a random word from our dictionary object inside a variable
var randWord = dictionary[Math.floor(Math.random() * dictionary.length)];
// console.log(init);




//stores if the game has been initialized or not.
wordGen.called = 0;

// Logs user's letter guess and updates it to userText
document.onkeyup = function keyDetect(event) {
  guessCount--;

  //Function evaluates answer and does stuff.
  //This function is called and executed later in keyDetect()
  //only if the key pressed is a letter.
  function evalWord() {
    //using for statements with nested ifs to evaluate the word



    // If array currentword contains the key pressed, then do stuff.
    // Else, do more stuff
    // Includes method: currentword.includes(event.key.toLowerCase())

    if (currentword.includes(event.key.toLowerCase())) {

      $("." + event.key).show();
      winCount++;
      document.getElementById("wins").innerHTML = "Wins: " + winCount;
      remainingGuesses.innerHTML = "Remaining guesses: " + guessCount;
      console.log(currentword + " includes the letter " + event.key);
    }

  }


  //capture onkeyup event keycode
  var charCode = event.keyCode;
  //allow only letters, and evalWord() only if letter is given
  if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8) {
    // console.log("letter");
    userGuess.textContent = event.key.toLowerCase();
    evalWord();

    alreadyGuessed.push(event.key);
    document.getElementById("already-guessed").innerHTML = "Already guessed: "+ alreadyGuessed;

  }
}
//end keypress evaluation function

//Function that generates words and processes them for
//1) display on the DOM tree, and 2) evluation with JavaScript
function wordGen() {

  //Loop through the randomly generated word and do two things:
  //1. Push HTML to array wordDisplay for HTML to be rendered on the page
//2. Convert the randomly chosen word into individual letters and store in an array called "currentword"
  for (i = 0; i < randWord.length; i++) {
      //If word includes duplicate letters, create a class for it
      //Else, create with a class of letter and unique id
    wordDisplay.push("<div class='box'><div class = '"+ randWord.charAt(i).toLowerCase() +" letters' style='margin: 0 auto; text-align: center; padding-top: 30%;'>" + randWord.charAt(i) + "</div></div>");
    currentword.push(randWord.charAt(i).toLowerCase());

  }

  //Removes commas from array and pushes wordDisplay to the DOM tree
  wordStage.innerHTML = wordDisplay.join("");

  //Uses jQuery to reload background image AFTER dynamically generated divs
  //to avoid formatting problems
  $(".container").css({"background-image": "url('https://wildcat510.github.io/images/zenkoan1.png')", "background-size": "cover", "background-repeat": "no-repeat"});

}

wordGen();
