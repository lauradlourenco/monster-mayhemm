class Path {
  static initialize(board) {
    this.board = board;
    this.activePath = [];

    const self = this; // Save reference to class context

    board.container.addEventListener('mousemove', (evt) => {
      const hoveredHex = evt.target.closest('.hex');
      if (!hoveredHex || !board.selectedHex || hoveredHex === board.selectedHex) {
        self.clearHighlight();
        return;
      }

      const startCoord = {
        col: parseInt(board.selectedHex.dataset.col, 10),
        row: parseInt(board.selectedHex.dataset.row, 10),
      };
      const endCoord = {
        col: parseInt(hoveredHex.dataset.col, 10),
        row: parseInt(hoveredHex.dataset.row, 10),
      };

      const route = self.computePath(startCoord, endCoord);
      self.highlightRoute(route);
    });

    board.container.addEventListener('click', () => {
      self.clearHighlight();
    });
  }

  static clearHighlight() {
    this.activePath.forEach(hex => hex.classList.remove('hex-path'));
    this.activePath = [];
  }

  static highlightRoute(route) {
    this.clearHighlight();
    for (const { col, row } of route) {
      const selector = `.hex[data-col="${col}"][data-row="${row}"]`;
      const hexElem = this.board.container.querySelector(selector);
      if (hexElem) {
        hexElem.classList.add('hex-path');
        this.activePath.push(hexElem);
      }
    }
  }

  static computePath(start, goal) {
    const cols = this.board.cols;
    const rows = this.board.rows;

    const visited = Array(cols).fill(null).map(() => Array(rows).fill(false));
    const parents = {};
    const queue = [start];

    visited[start.col][start.row] = true;

    const neighborsEven = [
      { dc:  1, dr:  0 }, { dc:  0, dr: -1 },
      { dc: -1, dr:  0 }, { dc:  0, dr:  1 },
      { dc:  1, dr: -1 }, { dc: -1, dr: -1 }
    ];
    const neighborsOdd = [
      { dc:  1, dr:  0 }, { dc:  0, dr: -1 },
      { dc: -1, dr:  0 }, { dc:  0, dr:  1 },
      { dc:  1, dr:  1 }, { dc: -1, dr:  1 }
    ];

    while (queue.length > 0) {
      const current = queue.shift();

      if (current.col === goal.col && current.row === goal.row) {
        const path = [];
        let key = `${goal.col},${goal.row}`;
        while (key !== `${start.col},${start.row}`) {
          const [c, r] = key.split(',').map(Number);
          path.unshift({ col: c, row: r });
          key = `${parents[key].col},${parents[key].row}`;
        }
        return path;
      }

      const offsets = (current.col % 2 === 0) ? neighborsEven : neighborsOdd;
      for (const { dc, dr } of offsets) {
        const nextCol = current.col + dc;
        const nextRow = current.row + dr;

        if (
          nextCol >= 0 && nextCol < cols &&
          nextRow >= 0 && nextRow < rows &&
          !visited[nextCol][nextRow]
        ) {
          visited[nextCol][nextRow] = true;
          parents[`${nextCol},${nextRow}`] = current;
          queue.push({ col: nextCol, row: nextRow });
        }
      }
    }

    return [];
  }
}

window.Path = Path;
