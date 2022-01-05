/* Rock Paper Scissor game against the computer */

const rps = ["Rock", "Paper", "Scissor"]; 

// function that returns a random number between 0-2
function getRandomInt(/*min=0, max=3*/) {
    // min = Math.ceil(min);
    // max = Math.floor(max);
    // return Math.floor(Math.random()*(max - min) + min);
    return Math.floor(Math.random()*3)
}

function computerPlay() {
    let randomChoice = getRandomInt(); 
    return rps[randomChoice]; 
}

function playRound() {
    let computerSelection = computerPlay(); 
    let playerSelection = prompt("Choose your move!\n1.Rock\n2.Paper\n3.Scissor\n"); 

    if (isNaN(playerSelection)) {
        playerSelection = capitalizeFirstLetter(playerSelection); // utilize capitalizeFirstLetter function to ignore casing of input
    } else {
        playerSelection = rps[parseInt(playerSelection)-1];
    }

    if (!rps.includes(playerSelection)) throw "Not a valid choice!"; 

    let result = play(playerSelection, computerSelection);

    if (result === "You Tie!") return (result + ` ${playerSelection} equals ${computerSelection}`);
    else {
        let winner = result ? playerSelection: computerSelection;
        let loser = !result ? playerSelection: computerSelection;
        return (result ? "You Win! ":"You Lose! ") + `${winner} beats ${loser}`;
    }
}

function capitalizeFirstLetter(string) {
    let first = string.charAt(0).toUpperCase();
    let rest = string.slice(1).toLowerCase();
    string = first + rest;
    return string;
}

function play(playerOne, playerTwo) {    
    if (playerOne === playerTwo) return "You Tie!";
    // use the first letter of the move in binary format to utilize comparison operator
    else {
        playerOne = playerOne.charCodeAt(0);
        playerTwo = playerTwo.charCodeAt(0);
    }

    /* Rock is already less than scissor and greater than paper,
       set paper to greater than rock and less than paper       */
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