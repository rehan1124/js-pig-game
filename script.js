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

const hideTheDice = function () {
  diceEl.classList.add("hidden");
};

const showTheDice = function () {
  diceEl.classList.remove("hidden");
};

const updateScore = function (player, score) {
  player.textContent = score;
};

// Set score to ZERO
score0El.textContent = 0;
score1El.textContent = 0;

// Hide the dice appearing on screen
hideTheDice();

rollDiceBtn.addEventListener("click", function () {
  // Generate randowm dice roll
  const dice = Math.trunc(Math.random() * 6 + 1);

  // Display dice
  showTheDice();
  diceEl.src = `images/dice-${dice}.png`;

  // If rolled 1: Switch to new player
  if (dice !== 1) {
    // Update current score
    currentScore += dice;
    updateScore(player1CurrentScoreEl, currentScore);
  }
});
