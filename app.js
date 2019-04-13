/*
  GAME FUNCTIONS
  - Player mus guess number between min and max
  - Player gets a certain amount of guesses
  - Notify player of guess remaning
  - Notify the correct answer if player loose
  - Let player choose to play again
*/


//Game variables
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessLeft = 3;

//UI variables
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  guessMsg = document.querySelector('.message');


//Assign numbers into UI
minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
})

//Listen for guess
guessBtn.addEventListener('click', submitGuess);

function submitGuess() {
  let guess = parseInt(guessInput.value);

  //Validate number
  if (isNaN(guess) || guess < min || guess > max) {

    setMessage(`Please enter number between ${min} and ${max}`, 'red', false);
  }

  if (guess === winningNum) {
    gameOver(true, `You won!! ${winningNum} is a correct number`);

  } else {
    //Wrong number
    guessLeft -= 1;

    if (guessLeft === 0) {
      //Game over
      gameOver(false, `Game over. The correct number was ${winningNum}`)
    } else {
      //Wrong answer but game continues
      guessInput.style.borderColor = 'red';
      guessInput.value = '';

      setMessage(`Wrong answer, you have ${guessLeft} number of guesses left`, 'red');
    }

  }
}


//setMessage function
function setMessage(msg, color) {
  guessMsg.style.color = color;
  guessMsg.textContent = msg;
}

//Get random number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  guessMsg.style.color = color;
  setMessage(msg);
  guessBtn.value = 'Play again';
  guessBtn.className += 'play-again';
}