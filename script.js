"use strict";

// Score web elements of 2 players
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
// Dice element
const diceEl = document.querySelector(".dice");
// New game button
const newGameBtn = document.querySelector(".btn--new");
// Role dice button
const rollDiceBtn = document.querySelector(".btn--roll");
// Hold button
const holdBtn = document.querySelector(".btn--hold");
// Player 1 & 2 current score
const player1CurrentScoreEl = document.getElementById("current--0");
const player2CurrentScoreEl = document.getElementById("current--1");

let currentScore = 0;
// 0 and 1 to set active inactive players
let activePlayer = 0;
let finalScores = [0, 0];
let playing = true;

const hideTheDice = function () {
  diceEl.classList.add("hidden");
};

const showTheDice = function () {
  diceEl.classList.remove("hidden");
};

const updateScore = function (player, score) {
  player.textContent = score;
};

const updateFinalScore = function (activePlayer, currentScore) {
  document.getElementById(`score--${activePlayer}`).textContent = currentScore;
};

const switchPlayers = function (player) {
  document
    .querySelector(`.player--${player}`)
    .classList.toggle("player--active");
};

// Set score to ZERO
score0El.textContent = 0;
score1El.textContent = 0;

// Hide the dice appearing on screen
hideTheDice();

rollDiceBtn.addEventListener("click", function () {
  if (playing) {
    // Generate randowm dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);

    // Display dice
    showTheDice();
    diceEl.src = `images/dice-${dice}.png`;

    // Dice value other than 1, update score.
    if (dice !== 1) {
      // Update current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // updateScore(player1CurrentScoreEl, currentScore);

      // When dice value is 1, switch players.
    } else {
      switchPlayers(activePlayer);
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      switchPlayers(activePlayer);
      // document.getElementById(`current--${activePlayer}`).textContent =
      //   currentScore;
    }
  }
});

holdBtn.addEventListener("click", function () {
  if (playing) {
    // Update score based on active player for the game
    finalScores[activePlayer] += currentScore;
    updateFinalScore(activePlayer, finalScores[activePlayer]);

    if (finalScores[activePlayer] >= 20) {
      document.getElementById(`name--${activePlayer}`).textContent = `Player ${
        activePlayer + 1
      } won the game !!!`;
      document.querySelector(".player--active").classList.add("player--winner");
      switchPlayers(activePlayer);
      playing = false;
      hideTheDice();
    } else {
      switchPlayers(activePlayer);
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      activePlayer = activePlayer === 0 ? 1 : 0;
      switchPlayers(activePlayer);
    }
  }
});
