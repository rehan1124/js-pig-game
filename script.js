"use strict";
/*
FIRST: Define all web elements
*/
// Final score web elements of 2 players
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

// Player 1 & 2 sections
const player1Section = document.querySelector(".player--0");
const player2Section = document.querySelector(".player--1");

/*
SECOND: Initialize variables which will hold some values and change
*/
// When new game begins
let currentScore = 0;

// 0 and 1 to set active inactive players
let activePlayer = 0;

// Final scores of both the players (Initial stage)
let finalScores = [0, 0];

// Decides whether game can be played or not
let playing = true;

/*
THIRD: Implement functions (DRY)
*/
const hideTheDice = function () {
  diceEl.classList.add("hidden");
};

const showTheDice = function () {
  diceEl.classList.remove("hidden");
};

// Not used anywhere
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

const declareWinner = function () {
  document.querySelector(".player--active").classList.add("player--winner");
};

const resetWinner = function () {
  player1Section.classList.remove("player--winner");
  player2Section.classList.remove("player--winner");
};

const initGame = function () {
  hideTheDice();
  player1Section.classList.add("player--active");
  player2Section.classList.remove("player--active");
  resetWinner();
  score0El.textContent = 0;
  score1El.textContent = 0;
  player1CurrentScoreEl.textContent = 0;
  player2CurrentScoreEl.textContent = 0;
  playing = true;
  console.log(`Game is played? ${playing}`);
  finalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
};

/*
-------------------
--- GAME BEGINS ---
-------------------
*/
initGame();

/*
USER CLICKS ON "ROLL DICE" BUTTON
*/
rollDiceBtn.addEventListener("click", function () {
  if (playing) {
    console.log(`Game is played? ${playing}`);
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

      // When dice value is 1, switch players.
    } else {
      switchPlayers(activePlayer);
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      switchPlayers(activePlayer);
    }
  }
});

/*
USER CLICKS ON "HOLD" BUTTON
*/
holdBtn.addEventListener("click", function () {
  if (playing) {
    console.log(`Game is played? ${playing}`);
    // Update final score based on active player for the game
    finalScores[activePlayer] += currentScore;
    updateFinalScore(activePlayer, finalScores[activePlayer]);

    if (finalScores[activePlayer] >= 20) {
      declareWinner();
      switchPlayers(activePlayer);
      playing = false;
      console.log(`Game is played? ${playing}`);
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

/*
USER CLICKS ON "NEW GAME" BUTTON
*/
newGameBtn.addEventListener("click", initGame);
