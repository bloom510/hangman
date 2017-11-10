//Developers: check the console to cheat... I mean debug!
//Ideas: Allow users to donate to causes for water, make media queries for mobile devices
//Convert letterCount to correctCount, and actual win count for every word guessed right
// Hide anything necessary with jQuery
$(document).ready(function() {
  startScreen();
  //load ripples.js
  $('.container').ripples({
    resolution: 512,
    dropRadius: 20,
    perturbance: 0.04,
  });
});


//Number of guesses
var guessCount = 20;
//correct letters
var letterCount = 0;
//overall wins
var winCount = 0;
//Letters already guessed
var alreadyGuessed = [];
//Array which will accept randomly generated words split into 1 letter per index
//for later evaluation against the keystroke event
var currentword = [];
//Collection of words for game

function startScreen() {

  alreadyGuessed = [];

  $(".letters").hide();
  $(".box").hide();
  $("#winMessage").hide();
  $("#loseMessage").hide();
  $("#instructions").hide();
  $("#illustration").hide();
  $("#stats").hide();
  $("#illustration").fadeIn(3000);
  $("#instructions").fadeIn(3000);
  rain();
  //update wins
  document.getElementById("correctLetters").innerHTML = "Correct: " + letterCount;
  //update guessCount
  document.getElementById("remaining-guesses").innerHTML = "Remaining Guesses: "+ guessCount;
  //
  document.getElementById("already-guessed").innerHTML = alreadyGuessed;

  setTimeout(function() {initGame();}, 3000);
  // console.log(init);
}

function winScreen() {

  letterCount = 0;
  guessCount = 20;
  alreadyGuessed = [];

  $("#loseMessage").hide();
  $("#instructions").hide();
  $("#illustration").hide().fadeIn(3000);
  $("#stats").hide();
  $("#winMessage").hide().fadeIn(3000);;

  rain();
  //update wins
  document.getElementById("correctLetters").innerHTML = "Correct: " + letterCount;
  //update guessCount
  document.getElementById("remaining-guesses").innerHTML = "Remaining Guesses: "+ guessCount;
  //update alreadyGuessed
  document.getElementById("already-guessed").innerHTML = alreadyGuessed;
  setTimeout(function() {initGame();}, 5000);
  // console.log(init);
}

function loseScreen() {

  letterCount = 0;
  guessCount = 20;
  alreadyGuessed = [];
  $(".letters:hidden").css({
    "color": "red",
  }).show();
  $("#loseMessage").show();
  $("#instructions").hide();
  $("#illustration").hide().fadeIn(3000);
  $("#stats").hide();
  $("#winMessage").hide();
  rain();
  //update wins
  document.getElementById("correctLetters").innerHTML = "Correct: " + letterCount;
  //update guessCount
  document.getElementById("remaining-guesses").innerHTML = "Remaining Guesses: "+ guessCount;
  //update alreadyGuessed
  document.getElementById("already-guessed").innerHTML = alreadyGuessed;
  setTimeout(function() {initGame();}, 5000);
  // console.log(init);
}

//Soothing rain background
function rain() {
  var x = document.createElement("AUDIO");
  x.setAttribute("src", "./assets/sound/rain.mp3");
  x.setAttribute("autoplay", "autoplay");
  x.setAttribute("loop", "loop");
  x.volume = "0.1";
  document.body.appendChild(x);
}

//Insert thunder function here:
function thunder() {
  var y = document.createElement("AUDIO");
  y.setAttribute("src", "./assets/sound/thunder.mp3");
  y.setAttribute("autoplay", "autoplay");
  y.loop = false;
  y.volume = "0.6";
  document.body.appendChild(y);
}

function checkGuess() {

  //==========================================================================================
  //   if guesses run out, reveal word with remaining hidden letters in red
  //   then, reset letters, bring back start screen with previous background color
  //==========================================================================================
  if (guessCount === 0) {
    alreadyGuessed = [];
    console.log(alreadyGuessed);

    $("#illustration").css({
      "background": "rgb(110, 110, 110)",
    });
    letterCount = 0;
    guessCount = 20;
    loseScreen();//loseScreen()
  }


}
//counter for game initialization
var init = false;

function initGame() {
  guessCount = 20;
  currentword = [];
  wordGen();
//Good example of closure. 3 levels of scope. 1)global, 2) outer, 3) inner.
  document.onkeyup = function() {
    //add 1 to init when key is pressed
    init = true;
    //if init is more than or equal to 1, hide instructions and initialize game
    if (init === true) {
      $("#winMessage").hide();
      $("#loseMessage").hide();
      $("#instructions").hide();
      $("#illustration").css({
        "background": "none",
      });
      $(".box").fadeIn(1500);
      $("#stats").fadeIn(1500);
      keyDetect();
      thunder();
      //set init back to zero to keep in a workable range for wins or losses
      init = 0;
    }
  }


}


//keyDetect() evaluates characters for letters, and calls game()
function keyDetect() {

  //game() generates and evaluates randomly generated words
  document.onkeyup = function game() {


    /*Function evaluates answer and updates the corresponding fields.
      This function is called and executed later in keyDetect()
      only if the key pressed is a letter.*/
    function evalWord() {

      //Get empty divs to give data to
      var userGuess = document.getElementById("user-guess");
      //converts key pressed to lowercase for evaluation
      // (function() { String.fromCharCode(event.keyCode).toLowerCase()});

      //troubleshoot case of letters returned
      // console.log(String.fromCharCode(event.keyCode).toLowerCase());

      // If array currentword contains the key pressed and not already guessed
      // Else, do more stuff
      if (currentword.includes(event.key.toLowerCase()) && !alreadyGuessed.includes(event.key.toLowerCase())) {
        $(".letters").css({
          "color": "white",
        });
        $("." + event.key.toLowerCase()).show();
        //add 1 to letterCount
        letterCount += $("." + event.key).length;
        console.log(letterCount);
        //subtract from guesses
        guessCount--;
        console.log(guessCount);
        //update array of already-guessed letters
        alreadyGuessed.push(event.key);
        //update wins
        document.getElementById("correctLetters").innerHTML = "Correct: " + letterCount;
        //update guessCount
        document.getElementById("remaining-guesses").innerHTML = "Remaining Guesses:" + guessCount;
        //update letter Guessed
        userGuess.textContent = event.key.toLowerCase();
        //troubleshoot
        // console.log(currentword.join("") + " includes the letter " + event.key);

      } else if (!currentword.includes(event.key.toLowerCase()) && !alreadyGuessed.includes(event.key.toLowerCase())) {

        //subtract from guesses
        guessCount--;
        console.log(guessCount);
        //move this outside and put in if statement for preventing guessing the same letter again
        alreadyGuessed.push(event.key);
        //update wins
        document.getElementById("correctLetters").innerHTML = "Correct: " + letterCount;
        //update guessCount
        document.getElementById("remaining-guesses").innerHTML = "Remaining Guesses: "+ guessCount;
        //update letter Guessed
        userGuess.textContent = event.key.toLowerCase();
        //troubleshoot
        // console.log(currentword.join("") + " does not include the letter " + event.key);
      }

      if (letterCount === currentword.length) {
        //======================================================================================
        // if number of wins is equal to number of letters in word, display win alert and
        // cue thunder!
        //======================================================================================
        winCount++;
        document.getElementById("wins").innerHTML = "Wins: "+ winCount;
        console.log("WINNING!");
        $("#illustration").css({
          "background": "rgb(110, 110, 110)",
        });
          winScreen();
      }
    checkGuess();

    }

    //capture onkeyup event keycode
    var charCode = event.keyCode;


    //allow only letters, and evalWord() only if letter is given
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8) {
      document.getElementById("already-guessed").innerHTML = alreadyGuessed;

      // console.log("letter");
      evalWord();
      //setTimeout(evalWord(),1500); is a good debugging option to check for interference


    }


  }

}
//end keypress evaluation function

//Function that generates words and processes them for
//1) display on the DOM tree, and 2) evluation with JavaScript
function wordGen() {
  //Array to hold HTML iterations of each letter to be rendered on the page
  var wordDisplay = [];

  var dictionary = [
    "rainfall",
    "fragrant",
    "petrichor",
    "rain",
    "winter",
    "aqua",
    "aqueduct",
    "well",
    "basin",
    "blizzard",
    "boil",
    "brine",
    "canal",
    "channel",
    "cloudburst",
    "condensation",
    "damp",
    "depth",
    "dew",
    "downpour",
    "drain",
    "drenched",
    "drinkable",
    "drizzle",
    "drop",
    "evaporation",
    "flood",
    "flow",
    "frost",
    "frozen",
    "geyser",
    "hail",
    "headwaters",
    "humidity",
    "hurricane",
    "hydrology",
    "hydropower",
    "ice",
    "crystals",
    "irrigation",
    "lake",
    "moisture",
    "monsoon",
    "ocean",
    "pond",
    "pool",
    "precipitation",
    "puddle",
    "runoff",
    "river",
    "snowfall",
    "snow",
    "spray",
    "sprinkler",
    "stream",
    "swamp",
    "tide",
    "typhoon",
    "vapor",
    "waterfront",
    "watershed",
    "waves",
    "wetlands",
  ];
  //Stores a random word from our dictionary object inside a variable
  var randWord = dictionary[Math.floor(Math.random() * dictionary.length)];
  //wordStage recieves HTML to render to the page for randomly generated word
  var wordStage = document.getElementById("stage");
  //Loop through the randomly generated word and do two things:
  //1. Push HTML to array wordDisplay for HTML to be rendered on the page
  //2. Convert the randomly chosen word into individual letters and store in an array called "currentword"
  for (i = 0; i < randWord.length; i++) {

    //If word includes duplicate letters, create a class for it
    //Else, create with a class of letter and unique id
    wordDisplay.push("<div class='box'><div class = '" + randWord.charAt(i).toLowerCase() + " letters' style='margin: 0 auto; text-align: center; padding-top: 30%;'>" + randWord.charAt(i) + "</div></div>");
    currentword.push(randWord.charAt(i).toLowerCase());
    //could this be achieved with neater code using JS methods like appendChild()? createElement()?

  }
  //Removes commas from array and pushes wordDisplay contents to the DOM tree
  wordStage.innerHTML = wordDisplay.join("");

  $(".letters").hide();
  $(".box").hide();

}
