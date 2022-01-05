/* Rock Paper Scissor game against the computer */

const rps = ["Rock", "Paper", "Scissor"]; // holds possible choices [0,1,2]

// function that returns a random number between 0-2
function getRandomInt(/*min=0, max=3*/) {
    // min = Math.ceil(min);
    // max = Math.floor(max);
    // return Math.floor(Math.random()*(max - min) + min);
    return Math.floor(Math.random()*3)
}

// returns a random choice from rps
function computerPlay() {
    let chosen = getRandomInt(); // chooses a random number
    return rps[chosen]; // selects the item in position of chosen number and returns it
}

function playRound() {
    let computerSelection = computerPlay(); // variable to hold computer's randomly chosen move
    let playerSelection = prompt("Choose your move!\n1.Rock\n2.Paper\n3.Scissor\n"); // promps user to choose a move

    if (isNaN(playerSelection)) {
        playerSelection = capitalizeFirstLetter(playerSelection); // utilize capitalizeFirstLetter function to ignore casing of input
    } else {
        playerSelection = rps[parseInt(playerSelection)-1]; // if user input is in the form of numbers
    }

    if (!rps.includes(playerSelection)) throw "Not a valid choice!"; // throws error when user doesn't type between 1-3 or rock, paper or scissor.

    let result = play(playerSelection, computerSelection);

    if (result === "You Tie!") return (result + ` ${playerSelection} equals ${computerSelection}`);
    else {
        let winner = result ? playerSelection: computerSelection;
        let loser = !result ? playerSelection: computerSelection;
        return (result ? "You Win! ":"You Lose! ") + `${winner} beats ${loser}`;
    }
}

// Capitalize first letter of input string and lowercase for remaining
function capitalizeFirstLetter(string) {
    let first = string.charAt(0).toUpperCase();
    let rest = string.slice(1).toLowerCase();
    string = first + rest;
    return string;
}

// Returns if playerOne win, lose, or tie
function play(playerOne, playerTwo) {    
    if (playerOne === playerTwo) return "You Tie!";
    else {
        // Turn first letter to binary to compare as a number
        playerOne = playerOne.charCodeAt(0);
        playerTwo = playerTwo.charCodeAt(0);
    }
    // Rock is already less than scissor and greater than paper
    // set paper to greater than rock and less than paper
    if (playerOne === 80) playerOne = 82.5; 

    let result = null;
    if (playerOne === 82 || playerOne === 82.5) {
        result = playerOne < playerTwo; // rock and paper comparison to others are in reverse order
    } else {
        playerOne = 81;                 // set scissor to greater than paper and less than rock which is in order
        result = playerOne > playerTwo;
    }
    
    return result;
}

for (let i = 0; i < 5; i++) {
    console.log(`Round ${i+1}\n--------`);
    console.log(playRound());
}