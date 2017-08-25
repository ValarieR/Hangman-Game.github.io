// Variables

// Word bank

    var computerWords = ["buffy", "vampire", "witch", "monster", "hobbit", "wizard",];

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

$(document).ready(function() {
// makes the blank spaces

function makeHyphens () {
    for (var i = 0; i < currentWord.length; i++)
        wordDisplay.push('_');
}


function updateWordDisplay() {
    for (var j = 0; j < currentWord.length; j++) {
        if (currentWord[j] === userGuess)
            wordDisplay[j] = currentWord[j];
    }
}


// Resets the game, by generating a new computer word and resetting guess variables.
function gameReset() {
    currentWord = computerWords[Math.floor(Math.random() * currentChoices.length)].toUpperCase();
    guessesLeft = 12;
    incorrectGuesses = [];
    userGuess = '';
    wordDisplay = [];
    makeHyphens();
}

// Sets up game for game over
function gameOver() {
    playerLosses++;
    setTimeout(function () {
        alert("GAME OVER\nThe correct word was:\n" + currentWord.toUpperCase());
    }, 0);
    gameReset();
}


/* GAME LOGIC */

// Initialize first instance of game
gameReset();
document.querySelector('#playerWins').innerHTML = "" + playerWins;
document.querySelector('#playerLosses').innerHTML = "" + playerLosses;
document.querySelector('#guessesLeft').innerHTML = "" + guessesLeft;
document.querySelector('#wordDisplay').innerHTML = wordDisplay.join(" ");

// Check user guess when the user presses a key.
document.onkeyup = function (event) {
    // Determines which key was pressed.
    userGuess = event.key.toUpperCase();


    //
    if (validGuesses.indexOf(userGuess) === -1) {
        alert('Invalid Input')
    }
    else if ((wordDisplay.indexOf(userGuess) === -1) && (incorrectGuesses.indexOf(userGuess) === -1)) {
        if (currentWord.indexOf(userGuess) > -1) {
            updateWordDisplay();
            if (wordDisplay.indexOf('_') === -1) {
                playerWins++;
                alert("Aaargh! Good job Matey\n" + currentWord.toUpperCase() + "\nwas correct!");
                gameReset();
            }
        }
        else {
            guessesLeft--;
            if (guessesLeft > 0) {
                console.log(incorrectGuesses);
                incorrectGuesses.push(userGuess);
                numWrong++;
                hang();
            } else {
                gameOver();
            }
        }
    }
// Update HTML with variable values
    document.querySelector('#playerWins').innerHTML = "" + playerWins;
    document.querySelector('#playerLosses').innerHTML = "" + playerLosses;
    document.querySelector('#guessesLeft').innerHTML = "" + guessesLeft;
    document.querySelector('#incorrectGuesses').innerHTML = incorrectGuesses.join(" ");
    document.querySelector('#wordDisplay').innerHTML = wordDisplay.join(" ");
};

});