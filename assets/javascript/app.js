// Hide anything necessary with jQuery
$(document).ready(function hideGuess() {
  $(".letter").hide();
});

//Get empty divs to give data to
var userGuess = document.getElementById("user-guess");
var wordStage = document.getElementById("stage");

//Array to hold HTML iterations of each letter to be rendered on the page
var wordDisplay = [];

//Array which will accept randomly generated words split into 1 letter per index
//for later evaluation against the keystroke event
var currentword = [];

//Collection of words for game
var dictionary = [
  "Ajax",
  "Wildcat",
  "Mythic",
  "Crystal",
  "Fragrant",
  "Petrichor",
  "Rain",
  "Winter",
  "Freestyle",
  "Gothic",
  "Modulus"
];

//Stores a random word from our dictionary object inside a variable
var randWord = dictionary[Math.floor(Math.random() * dictionary.length)];

//Function evaluates answer and does stuff.
//This function is called and executed later in keyDetect()
//only if the key pressed is a letter.
function evalWord() {
  //If array currentword contains the key pressed, then do stuff.
  //Else, do more stuff
  if (currentword.includes(event.key)) {
    console.log("yes, " + event.key);
    $(".letter").show();
  } else {
    console.log("no, " + event.key);
    $(".letter").hide();
    //reduce number of tries left
  }
}

// Logs user's letter guess and updates it to userText
document.onkeyup = function keyDetect(event) {

  //capture onkeyup event keycode
  var charCode = event.keyCode;

  //allow only letters, and evalWord() only if letter is given
  if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8) {
    console.log("letters");
    userGuess.textContent = event.key.toLowerCase();
    evalWord();
    return true;
  } else {
    return false;
    console.log("numbers");
  }
  //Problem: add guessed letters to an alreadyGuessed array
}
//end keypress evaluation function

//Function that generates words and processes them for
//1) display on the DOM tree, and 2) evluation with JavaScript
function wordGen() {

  //Loop through the randomly generated word and do two things:
  //1. Push HTML to array wordDisplay for HTML to be rendered on the page
  //2. Convert the randomly chosen word into individual letters and store in an array called "currentword"
  for (i = 0; i < randWord.length; i++) {
    //Problem: we need to push a unique ID for each letter name in order to
    //reveal that letter when it is guessed
    wordDisplay.push("<div class='box'><div class='letter' style='margin: 0 auto; text-align: center; padding-top: 30%;'>" + randWord.charAt(i) + "</div></div>");
    currentword.push(randWord.charAt(i).toLowerCase());
  }

  //Removes commas from array and pushes wordDisplay to the DOM tree
  wordStage.innerHTML = wordDisplay.join("");

}

wordGen();
