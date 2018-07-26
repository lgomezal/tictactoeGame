import React from "react";
import PropTypes from "prop-types";

import Square from "./square";

const Board = ({ squares, onClick }) => {
  function renderSquare(i) {
    return (
      <Square
        key={`square-${i}`}
        const
        value={squares[i]}
        onClick={() => onClick(i)}
      />
    );
  }

  function rowSquare(index) {
    const cols = [];
    for (let col = 0; col < 3; col += 1) {
      cols.push(renderSquare(index + col));
    }
    return cols;
  }

  return squares.map((val, i) => {
    if (i % 3 === 0) {
      const row = i / 3;
      return (
        <div key={row} className="board-row">
          {rowSquare(i)}
        </div>
      );
    }

    return null;
  });
};

Board.propTypes = {
  squares: PropTypes.arrayOf.isRequired
};

export default Board;
