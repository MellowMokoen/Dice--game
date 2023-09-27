//  Selecting elements
let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');
let score0El = document.getElementById('score--0');
let score1El = document.getElementById('score--1');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');
let diceEl = document.querySelector('.dice');
let startBtn = document.querySelector('.btn--new');
let rollBtn = document.querySelector('.btn--roll');
let holdBtn = document.querySelector('.btn--hold');

// Initialize game state
let scores, currentScore, activePlayer, playing;

let init = () => {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = '0';
    score1El.textContent = '0';
    current0El.textContent = '0';
    current1El.textContent = '0';

    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');

    diceEl.classList.add('show');
};

init();

let switchPlayer = () => {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
};

// Rolling dice functionality
rollBtn.addEventListener('click', () => {
    if (playing) {
        // Generate a random dice roll
        let dice = Math.trunc(Math.random() * 6) + 1;

        // Display the dice
        diceEl.classList.remove('hidden');
        diceEl.src = `images/${dice}.jpeg`;

        // Check for a rolled 1
        if (dice !== 1) {
            // Add dice to the current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch to the next player
            switchPlayer();
        }
    }
});

// Hold the current score
holdBtn.addEventListener('click', () => {
    if (playing) {
        // Add current score to the active player's total score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // Check if the player won
        if (scores[activePlayer] >= 12) {
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            
            // Display the winner message in place of the h2 respectively
            
            let h2 = document.getElementById(`name--${activePlayer}`);
            h2.textContent = "YOU WIN ! Player " + (activePlayer + 1);
             
        } else {
            // Move to the next player
            switchPlayer();
        }
    }
});

// Event listener to start the game
startBtn.addEventListener('click', init);

