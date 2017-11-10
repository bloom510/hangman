//Developers: check the console to cheat... I mean debug!
//Ideas: Allow users to donate to causes for water, make media queries for mobile devices
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

function startScreen() {

  alreadyGuessed = [];

  $(".letters").hide();
  $(".box").hide();
  $("#loseMessage").hide();
  $("#instructions").hide();
  $("#illustration").hide();
  $("#stats").hide();
  $("#illustration").fadeIn(3000);
  $("#instructions").fadeIn(3000);
  rain();
  //update wins
  document.getElementById("wins").innerHTML = "Correct: " + winCount;
  //update guessCount
  document.getElementById("remaining-guesses").innerHTML = guessCount;
  //
  document.getElementById("already-guessed").innerHTML = alreadyGuessed;

  setTimeout(function() {
    initGame();
  }, 5000);
  console.log(init);
}

//Get empty divs to give data to
var userGuess = document.getElementById("user-guess");
//wordStage recieves HTML to render to the page for randomly generated word
var wordStage = document.getElementById("stage");
//Number of guesses
var guessCount = 20;
//Wins
var winCount = 0;
//Letters already guessed
var alreadyGuessed = [];
//Array to hold HTML iterations of each letter to be rendered on the page
var wordDisplay = [];
//Array which will accept randomly generated words split into 1 letter per index
//for later evaluation against the keystroke event
var currentword = [];
//Collection of words for game
var dictionary = [
  "rainfall",
  // "fragrant",
  // "petrichor",
  // "rain",
  // "winter",
  // "aqua",
  // "aqueduct",
  // "well",
  // "basin",
  // "blizzard",
  // "boil",
  // "brine",
  // "brook",
  // "canal",
  // "channel",
  // "cloudburst",
  // "condensation",
  // "confluence",
  // "course",
  // "damp",
  // "depth",
  // "dew",
  // "downpour",
  // "drain",
  // "drenched",
  // "drinkable",
  // "drizzle",
  // "drop",
  // "effluent",
  // "evaporation",
  // "flood",
  // "flow",
  // "fluvial",
  // "frost",
  // "frozen",
  // "geyser",
  // "hail",
  // "headwaters",
  // "humidity",
  // "hurricane",
  // "hydrology",
  // "hydropower",
  // "ice",
  // "crystals",
  // "irrigation",
  // "lake",
  // "moisture",
  // "monsoon",
  // "ocean",
  // "pond",
  // "pool",
  // "precipitation",
  // "puddle",
  // "runoff",
  // "river",
  // "snowfall",
  // "snow",
  // "spray",
  // "sprinkler",
  // "stream",
  // "swamp",
  // "tide",
  // "typhoon",
  // "vapor",
  // "waterfront",
  // "watershed",
  // "waves",
  // "wetlands",
];

//Stores a random word from our dictionary object inside a variable
var randWord = dictionary[Math.floor(Math.random() * dictionary.length)];

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
  //   then, reset letters, bring back and move to start screen with previous background color
  //==========================================================================================
  if (guessCount === 1) {
    alreadyGuessed = [];
    console.log(alreadyGuessed);
    $("#illustration").css({
      "background": "rgb(110, 110, 110)",
    });
    winCount = 0;
    guessCount = 21;
    startScreen();
  }


}

var init = 0;


function initGame() {

  document.onkeyup = function() {
    //add 1 to init when key is pressed
    init++;

    //if init is more than or equal to 1, hide instructions and initialize game
    if (init >= 1) {
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
    checkGuess();

    /*Function evaluates answer updates the corresponding fields.
      This function is called and executed later in keyDetect()
      only if the key pressed is a letter.*/
    function evalWord() {

      //converts key pressed to lowercase for evaluation
      // (function() { String.fromCharCode(event.keyCode).toLowerCase()});

      //troubleshoot case of letters returned
      console.log(String.fromCharCode(event.keyCode).toLowerCase());

      // If array currentword contains the key pressed and not already guessed
      // Else, do more stuff
      if (currentword.includes(event.key.toLowerCase()) && !alreadyGuessed.includes(event.key.toLowerCase())) {

        $("." + event.key.toLowerCase()).show();
        //add 1 to winCount
        winCount += $("." + event.key).length;
        console.log(winCount);
        //subtract from guesses
        guessCount--;
        //reveal that letter
        //move this outside and put in if statement for preventing guessing the same letter again
        alreadyGuessed.push(event.key);
        //update wins
        document.getElementById("wins").innerHTML = "Correct: " + winCount;
        //update guessCount
        document.getElementById("remaining-guesses").innerHTML = guessCount;
        //update letter Guessed
        userGuess.textContent = event.key.toLowerCase();
        //troubleshoot
        console.log(currentword.join("") + " includes the letter " + event.key);

      } else if (!currentword.includes(event.key.toLowerCase()) && !alreadyGuessed.includes(event.key.toLowerCase())) {

        //subtract from guesses
        guessCount--;
        //move this outside and put in if statement for preventing guessing the same letter again
        alreadyGuessed.push(event.key);
        //update wins
        document.getElementById("wins").innerHTML = "Correct: " + winCount;
        //update guessCount
        document.getElementById("remaining-guesses").innerHTML = guessCount;
        //update letter Guessed
        userGuess.textContent = event.key.toLowerCase();
        //troubleshoot
        console.log(currentword.join("") + " does not include the letter " + event.key);
      }

      if (winCount === currentword.length) {
        //======================================================================================
        // if number of wins is equal to number of letters in word, display win alert and
        // cue thunder!
        //======================================================================================
        console.log("WINNING!");
      }


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


}


wordGen();
