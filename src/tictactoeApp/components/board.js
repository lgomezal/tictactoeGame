import React from 'react';
import Square from './square';

class Board extends React.Component {
  rowSquare(index) {
    const rowSquare = [];
    for (let i = index; i < index + 3; i += 1) {
      rowSquare.push(this.renderSquare(i));
    }
    return rowSquare;
  }

  boardRow() {
    const boardRow = [];
    for (let i = 0; i < 3; i += 1) {
      boardRow.push(
        <div key={`board-row-${i}`} className="board-row">
          {this.rowSquare(i * 3)}
        </div>,
      );
    }
    return boardRow;
  }

  renderSquare(i) {
    return (
      <Square
        key={`square-${i}`}
        highlight={this.props.location.includes(i) ? 'highlight-current' : ''}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        {this.boardRow()}
      </div>
    );
  }
}

export default Board;
