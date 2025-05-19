/**
 * GameBoard class:
 *  - Displays a 10 by 10 grid of flat-top hexagons.
 *  - Highlights hexes on hover and selection.
 *  - Plays sound effects on user interaction.
 *  - Allows deselecting by clicking outside hexes.
 */
class GameBoard {
  /**
   * @param {Object} config
   * @param {HTMLElement} config.container - Container DOM element for the board.
   * @param {number} config.rows          - Number of grid rows.
   * @param {number} config.cols          - Number of grid columns.
   * @param {number} config.size          - Hexagon side length in pixels.
   */
  constructor({ container, rows, cols, size }) {
    this.container = container;
    this.rows = rows;
    this.cols = cols;
    this.size = size;
    this.activeHex = null; // Currently selected hex

    this.hexWidth = 2 * size;
    this.hexHeight = Math.sqrt(3) * size;
    this.horizontalGap = 0.75 * this.hexWidth;
    this.verticalGap = this.hexHeight;

    this._initContainer();
    this._renderGrid();
    this._bindDeselectOnBackground();
  }

  // Set container styles to fit the grid
  _initContainer() {
    const c = this.container;
    c.style.position = 'relative';
    c.style.width = `${(this.cols - 1) * this.horizontalGap + this.hexWidth}px`;

    // Account for vertical offset on odd columns for height
    const offsetHeight = (this.cols % 2) * (this.hexHeight / 2);
    c.style.height = `${(this.rows - 1) * this.verticalGap + this.hexHeight + offsetHeight}px`;
    c.style.overflow = 'hidden';
  }

  // Create hex elements and add to container
  _renderGrid() {
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        const hex = this._makeHex(x, y);
        this.container.appendChild(hex);
        this._addHexListeners(hex);
      }
    }
  }

  // Generate a single hex DOM element at (col, row)
  _makeHex(col, row) {
    const xPos = col * this.horizontalGap;
    const yPos = row * this.verticalGap + (col % 2) * (this.hexHeight / 2);

    const hex = document.createElement('div');
    hex.classList.add('hex');
    hex.style.position = 'absolute';
    hex.style.width = `${this.hexWidth}px`;
    hex.style.height = `${this.hexHeight}px`;
    hex.style.left = `${xPos}px`;
    hex.style.top = `${yPos}px`;

    hex.dataset.col = col;
    hex.dataset.row = row;

    return hex;
  }

  // Attach mouse and click events to hex with sound effects
  _addHexListeners(hex) {
    hex.addEventListener('mouseenter', () => {
      if (hex !== this.activeHex) {
        hex.classList.add('hex-hover');
        Sound.play('hover');
      }
    });

    hex.addEventListener('mouseleave', () => {
      if (hex !== this.activeHex) {
        hex.classList.remove('hex-hover');
      }
    });

    hex.addEventListener('click', (e) => {
      e.stopPropagation();

      if (this.activeHex && this.activeHex !== hex) {
        this.activeHex.classList.remove('hex-selected');
      }

      if (hex === this.activeHex) {
        hex.classList.remove('hex-selected');
        this.activeHex = null;
      } else {
        hex.classList.remove('hex-hover');
        hex.classList.add('hex-selected');
        this.activeHex = hex;
      }

      Sound.play('click');
    });
  }

  // Clicking outside hexes deselects any selected hex
  _bindDeselectOnBackground() {
    this.container.addEventListener('click', () => {
      if (this.activeHex) {
        this.activeHex.classList.remove('hex-selected');
        this.activeHex = null;
      }
    });
  }
}

// Make the class globally accessible
window.GameBoard = GameBoard;
