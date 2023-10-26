const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

// Function to resize the canvas to match the viewport size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Call the resizeCanvas function when the window is resized
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initialize the canvas size

// Define the Game of Life grid size and cell size
const gridSize = 10;
const cellSize = 10;

// Calculate the number of rows and columns
const numRows = Math.floor(canvas.height / gridSize);
const numCols = Math.floor(canvas.width / gridSize);

// Function to create a random initial state
function createRandomState() {
  const state = [];
  for (let i = 0; i < numRows; i++) {
    const row = [];
    for (let j = 0; j < numCols; j++) {
      row.push(Math.random() > 0.5 ? 1 : 0); // 1 is a live cell, 0 is a dead cell
    }
    state.push(row);
  }
  return state;
}

// Function to count live neighbors
function countLiveNeighbors(state, x, y) {
  let count = 0;
  const neighbors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (const [dx, dy] of neighbors) {
    const newX = x + dx;
    const newY = y + dy;

    if (newX >= 0 && newX < numRows && newY >= 0 && newY < numCols) {
      count += state[newX][newY];
    }
  }

  return count;
}

// Function to update the Game of Life state
function updateState(state) {
  const newState = [];

  for (let i = 0; i < numRows; i++) {
    const newRow = [];
    for (let j = 0; j < numCols; j++) {
      const liveNeighbors = countLiveNeighbors(state, i, j);

      if (state[i][j] === 1) {
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          newRow.push(0); // Cell dies
        } else {
          newRow.push(1); // Cell lives
        }
      } else {
        if (liveNeighbors === 3) {
          newRow.push(1); // Cell becomes alive
        } else {
          newRow.push(0); // Cell remains dead
        }
      }
    }
    newState.push(newRow);
  }

  return newState;
}

// Function to draw the Game of Life grid
function drawGrid(state) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (state[i][j] === 1) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(j * gridSize, i * gridSize, cellSize, cellSize);
      }
    }
  }
}

canvas.addEventListener('click', () => {
    gameState = createRandomState(); // Reset the game state
    drawGrid(gameState); // Redraw the grid
  });

// Replace setInterval with requestAnimationFrame for smoother animation
function animateGameOfLife() {
  gameState = updateState(gameState);
  drawGrid(gameState);
  requestAnimationFrame(animateGameOfLife);
}

// Initialize the Game of Life state
let gameState = createRandomState();

// Start the animation loop
animateGameOfLife();