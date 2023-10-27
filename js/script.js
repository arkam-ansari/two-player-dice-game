// Initialize the variables
var score, activePlayer, roundedScore, winnerValue, gamePlaying;

// Initialize the Game
init();


// Handle Click on Roll Dice Button
document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    // 1. Random Number
    var diceValue = Math.floor(Math.random() * 6) + 1;
    var diceValue1 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    document.querySelector('#dice-0').style.display = 'block';
    document.querySelector('#dice-1').style.display = 'block';

    var diceDOM = document.querySelector('#dice-0');
    diceDOM.src = ('./assets/images/dice-' + diceValue + '.png');


    var diceDOM1 = document.querySelector('#dice-1');
    diceDOM1.src = ('./assets/images/dice-' + diceValue1 + '.png');
    //3. Update the round number if its not zero
    if (diceValue != 1 && diceValue1 != 1) {
      // Add Score
      roundedScore = diceValue + diceValue1 + roundedScore;
      document.querySelector('#current-' + activePlayer).textContent = roundedScore;
    } else {
      // Next Player
      nextPlayer();
    }
  }
});


// Handle Click on Hold Button
document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    // Add Score to Global Score
    score[activePlayer] += roundedScore;
    document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
    // Check the winner
    var input = document.getElementById('winner-value').value;
    if (input) {
      winnerValue = input
    } else {
      winnerValue = 100;
    }
    if (score[activePlayer] >= winnerValue) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner';
      document.querySelector('.player-' + activePlayer).classList.add("player-winner");
      document.querySelector('#dice-0').style.display = 'none';
      document.querySelector('#dice-1').style.display = 'none';
      gamePlaying = false
    } else {
      nextPlayer()
    }
  }
});

// Handle Click on New Game Button 
document.querySelector('.btn-new').addEventListener('click', init);

// Initial / Reset the game value's as per default 
function init() {
  score = [0, 0];
  activePlayer = 0;
  roundedScore = 0;
  gamePlaying = true;
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0').classList.remove("player-winner");
  document.querySelector('.player-1').classList.remove("player-winner");
  document.querySelector('.player-0').classList.remove('player-active');
  document.querySelector('.player-1').classList.remove('player-active');
  document.querySelector('.player-0').classList.add('player-active');


  document.querySelector('#dice-0').style.display = 'none';
  document.querySelector('#dice-1').style.display = 'none';
}

// Switch the Active Player functionality
function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  roundedScore = 0;

  document.querySelector('.player-0').classList.toggle('player-active');
  document.querySelector('.player-1').classList.toggle('player-active');

  document.querySelector('#dice-0').style.display = 'none';
  document.querySelector('#dice-1').style.display = 'none';
}