
  //Get empty divs to give data to
  var userGuess = document.getElementById("user-guess");
  var wordStage = document.getElementById("stage");
  //Array to hold HTML iterations of each letter to be rendered on the page
  var wordDisplay = [];
  var currentword = [];

  //Collection of words
  var dictionary = [
    "Ajar",
    "Wildcat",
    "Mythic",
    "Crystal"
  ]
  var randWord = dictionary[Math.floor(Math.random() * dictionary.length)];

  // Hide anything necessary with jQuery
  $(document).ready(function hideGuess() {
    // $(userText).hide();
  });


//Function that generates words, displays them on the page,
//Evaluates keystrokes to the given word, and executes the appropriate
//operations based on user input.

  function wordGen() {
    //Loop through the randomly generated word and do two things:
    //1. Push HTML to an array for DOM manipulation
    //2. Convert the randomly chosen word into letters and store in an array called "currentword"
    for (i = 0; i < randWord.length; i++) {
      //Problem: we need to push a unique ID for each letter name in order to
      //reveal that letter when it is guessed
      wordDisplay.push("<div class='box'><div class='letter' style='margin: 0 auto; text-align: center; padding-top: 30%;'>" + randWord.charAt(i) + "</div></div>");
      currentword.push(randWord.charAt(i).toLowerCase());
    }

    //Remove commas from array to display as plain text in DOM
    wordStage.innerHTML = wordDisplay.join("");


    // Logs user's letter guess and updates it to userText
    document.onkeyup = function keyDetect(event) {
      userGuess.textContent = "Letter Guessed: " + event.key.toLowerCase();

//When key pressed, if array currentword contains the key pressed, then do stuff.
//Else, do more stuff
      if (currentword.includes(event.key)) {
        console.log("yes, " + event.key);
        $(".letter").show();
      } else {
        console.log("no, " + event.key);
        $(".letter").hide();
        //reduce number of tries left
      }
//Problem: add letters to an already guessed array
    }
    //end keypress evaluation function

  }

  wordGen();
