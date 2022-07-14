/* GAME FUNCTION:
- Player must guess a number between a min & max 
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if player looses
- Let player choose to play again */

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft = 3;

// UI Elements
const UIgame = document.querySelector('#game'),
    UIminNum = document.querySelector('.min-num'),
    UImaxNum = document.querySelector('.max-num'),
    UIguessBtn = document.querySelector('#guess-btn'),
    UIguessInput = document.querySelector('#guess-input'),
    UImessage = document.querySelector('.message');

// Assign UI min & max
UIminNum.textContent = min;
UImaxNum.textContent = max;
// UIguessInput.placeholder = 'Enter';

//  Play again event listener
UIgame.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
});

// Listen event for guess
UIguessBtn.addEventListener('click', function () {
    let guess = parseInt(UIguessInput.value);

    // Validate - not empty(NaN), not less than min or higher than max
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Check if won
    if (guess === winningNum) {
        // Game Over - WON
        gameOver(true, `${winningNum} is correct, YOU WIN!`);
    } else {
        // Wrong number
        guessesLeft -= 1;

        if (guessesLeft === 0) {

            // Game over - LOST
            gameOver(false,`Game Over, you lost. The correct number was ${winningNum}`);
        } else {
            // Game Continues - Ans Wrong

            // Change border color 
            UIguessInput.style.borderColor = 'red';

            // Clear Input
            UIguessInput.value = '';

            // Tell user it is the wrong number & show no of guesses left
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }
});

// Game over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    // Disable input
    UIguessInput.disabled = true;
    // Change border color 
    UIguessInput.style.borderColor = 'green';
    // set text color
    UImessage.style.color = color;
    // Set message for winner
    setMessage(msg);

    // Play again
    UIguessBtn.value = 'Play Again';
    UIguessBtn.className += 'play-again';
}

// Get Random Number function
function getRandomNum(min, max){
    // getting a random whole no using random() & rounding off to lowest possible whole no using floor().
    // random no * (10-1+1) + 1
    return Math.floor(Math.random() * (max-min+1) + min);
}

// Set Message function
function setMessage(msg, color) {
    UImessage.style.color = color;
    UImessage.textContent = msg;
}