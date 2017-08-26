// Variables

console.log("variables")

// Word bank - geeky theme

    var computerWords = [ 
    	"vampire", 
    	"witch", 
    	"monster", 
    	"hobbit", 
    	"wizard",
    	"robot",
    	"scientist",
    	"technology",
    	"dragon",
    	"fantasy",
    	];

// Number of player wins

    var playerWins = 0;

// Number of player losses

    var playerLosses = 0;

// Remaining guesses

    var guessesLeft;

// All incorrect letters player has guessed

    var incorrectGuesses;

// Current letter player just guessed

    var userGuess;

// Current word computer has chosen for player to guess

    var currentWord = '';

// Current word display area

    var wordDisplay = '';

// Creates variable to hold valid player guesses (A-Z)

    var validGuesses = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');


// Functions
// makes the blank spaces

function makeHyphens () {
    for (var i = 0; i < currentWord.length; i++)
        wordDisplay.push('_');
}

console.log("post makeHyphen function")

function updateWordDisplay() {
    for (var j = 0; j < currentWord.length; j++) {
        if (currentWord[j] === userGuess)
            wordDisplay[j] = currentWord[j];
    }
}


// Resets the game
function gameReset() {
	console.log(Math.floor(Math.random() * computerWords.length))
    currentWord = computerWords[Math.floor(Math.random() * computerWords.length)].toUpperCase();
    guessesLeft = 12;
    incorrectGuesses = [];
    userGuess = '';
    wordDisplay = [];
    makeHyphens();
}

// Sets up game for game over
function nextRound() {
    playerLosses++;
    setTimeout(function () {
        alert("Try again, Friend.\nThe correct word was:\n" + currentWord.toUpperCase());
    }, 0);
    gameReset();
}

// When the game starts, everything zeroes out, blanks appear
gameReset();
document.querySelector('#playerWins').innerHTML = ""+ playerWins;
document.querySelector('#playerLosses').innerHTML = "" + playerLosses;
document.querySelector('#guessesLeft').innerHTML = "" + guessesLeft;
document.querySelector('#wordDisplay').innerHTML = wordDisplay.join(" ");

// Player picks a letter
document.onkeyup = function (event) {
    userGuess = event.key.toUpperCase();


    if (validGuesses.indexOf(userGuess) === -1) {
        alert('Invalid Input')
    }
    else if ((wordDisplay.indexOf(userGuess) === -1) && (incorrectGuesses.indexOf(userGuess) === -1)) {
        if (currentWord.indexOf(userGuess) > -1) {
            updateWordDisplay();
            if (wordDisplay.indexOf('_') === -1) {
                playerWins++;
                alert("Well done, Geekling!\n" + currentWord.toUpperCase() + "\nis correct!");
                gameReset();
            }
        }
        else {
            guessesLeft--;
            if (guessesLeft > 0) {
                console.log(incorrectGuesses);
                incorrectGuesses.push(userGuess);
            } else {
                nextRound();
            }
        }
    }
// Update HTML with variable values
    document.querySelector('#playerWins').innerHTML = "" + playerWins;
    document.querySelector('#playerLosses').innerHTML = "" + playerLosses;
    document.querySelector('#guessesLeft').innerHTML = "" + guessesLeft;
    document.querySelector('#incorrectGuesses').innerHTML = incorrectGuesses.join(" ");
    document.querySelector('#wordDisplay').innerHTML = wordDisplay.join(" ");
}