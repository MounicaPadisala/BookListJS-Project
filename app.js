/*Game Function
 -Player must guess a number between min and max.
 -Player gets a certian amount of guesses.
 -Notify the player of guesses remaining.
 -Notify the player of correct answer if loose.
 -Let player choose to play again.
 */
console.log('let the game begin...');
//Game Values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min,max),
  guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;
//play agian event listener
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
     window.location.reload();
  }
 
})

//event listner
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);
//validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }
//check if won
  if (guess === winningNum) {
   gameOver(true,`${winningNum} is correct, YOU WIN!`)
    
  } else {
    //guessesLeft
    guessesLeft -= 1;

    if (guessesLeft === 0) {
     gameOver(false,`your guess is incorrect, You lost! the correct number is ${winningNum}.`)
    } else {
      //wrong guess
      // set border color to red
    guessInput.style.borderColor = 'red';
    // show  message
    setMessage(`${guess} is incorrect,${guessesLeft} guesses left.`, 'red');
    }
    
  }
})
    
// create function setMessage
function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}
//gameOver function
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  //disable the input
  guessInput.disabled = true;
  //set input bordercolor and message color
  guessInput.style.borderColor = color;
  message.style.color = color;
  //set message
  setMessage(msg);

  //play again
  guessBtn.value = 'Play Again';
  //class name
  guessBtn.className += 'play-again';
}
// function getRandomNum
function getRandomNum(min, max) {
  return (Math.floor(Math.random() * (max - min + 1) + min));
}

