/**
 * Main entry point for Monster Mayhem.
 * Responsibilities:
 * - Preload UI sounds.
 * - Initialize and render the GameBoard.
 * - Setup pathfinding.
 * - Reset board on button click.
 * - Load character data for game use.
 */

document.addEventListener('DOMContentLoaded', () => {
  const SOUNDS = {
    hover: 'assets/sounds/hover.mp3',
    click: 'assets/sounds/click.mp3',
  };

  const CONFIG = {
    hexSize: 30,
    rows: 10,
    cols: 10,
  };

  // Preload sounds
  function preloadSounds() {
    Sound.preload(SOUNDS);
  }

  // Setup game board and return instance
  function createGameBoard() {
    const container = document.getElementById('board');
    if (!container) {
      console.error('Error: Board container not found!');
      return null;
    }
    return new GameBoard({
      container,
      rows: CONFIG.rows,
      cols: CONFIG.cols,
      size: CONFIG.hexSize,
    });
  }

  // Reset the board visually and clear paths
  function resetBoard(board) {
    const container = document.getElementById('board');
    if (!container) return;
    container.innerHTML = '';
    Path.clearPath();
    board._drawGrid();
  }

  // Initialize the app
  function init() {
    preloadSounds();

    const gameBoard = createGameBoard();
    if (!gameBoard) return;

    window.gameBoard = gameBoard; // expose for debug

    Path.init(gameBoard);

    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => resetBoard(gameBoard));
    }

    DataLoader.loadCharacters()
      .then(characters => {
        console.log('Characters loaded:', characters);
        // Use character data here if needed
      })
      .catch(err => {
        console.error('Error loading characters:', err);
      });
  }

  init();
});
