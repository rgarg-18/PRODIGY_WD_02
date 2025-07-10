const board = document.getElementById('board');
const status = document.getElementById('status');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // cols
  [0, 4, 8], [2, 4, 6]              // diagonals
];

// Handle a cell click
function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute('data-index');

  // Ignore click if cell already filled or game is over
  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    status.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (gameState.every(cell => cell !== "")) {
    status.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  // Switch turn
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s Turn`;
}

// Check for a win
function checkWin() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return gameState[a] &&
           gameState[a] === gameState[b] &&
           gameState[a] === gameState[c];
  });
}

// Restart the game
function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  status.textContent = `Player ${currentPlayer}'s Turn`;

  // Clear the board UI
  document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = "";
  });
}

// Add event listeners
document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
