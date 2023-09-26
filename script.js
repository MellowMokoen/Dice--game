// Selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const startBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

// Initialize game state
let scores, currentScore, activePlayer, playing;

const init = () => {
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

const switchPlayer = () => {
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
        const dice = Math.trunc(Math.random() * 6) + 1;

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

// Holding current score
holdBtn.addEventListener('click', () => {
    if (playing) {
        // Add current score to the active player's total score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // Check if the player won
        if (scores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // Switch to the next player
            switchPlayer();
        }
    }
});

// Start game functionality
startBtn.addEventListener('click', init);
