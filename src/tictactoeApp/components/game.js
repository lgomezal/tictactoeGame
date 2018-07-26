import React, { Component } from "react";

import Board from "./board";
import "../game.css";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null), location: [null] }],
      xIsNext: true,
      stepNumber: 0,
      sortMoves: true
    };
    this.winnerArray = null;
  }

  handleClick(index) {
    const { history, xIsNext, stepNumber } = this.state;
    const historyNew = history.slice(0, stepNumber + 1);
    const current = historyNew[historyNew.length - 1];
    const squares = [...current.squares];

    if (calculateWinner(squares) || squares[index]) return;
    squares[index] = xIsNext ? "X" : "O";
    this.setState({
      history: historyNew.concat([{ squares, location: [index] }]), // Unlike the array push() method you might be more familiar with, the concat() method doesn’t mutate the original array, so we prefer it.
      xIsNext: !xIsNext,
      stepNumber: historyNew.length
    });
  }

  gameStatus(squares) {
    const { xIsNext } = this.state;
    const winningSquares = calculateWinner(squares);
    let status;
    if (winningSquares) {
      status = `Winner: ${squares[winningSquares[0]]}`;
      this.winnerArray = winningSquares;
    } else {
      status = squares.includes(null)
        ? `Next player is: ${xIsNext ? "X" : "O"}`
        : "Game draw!!!";
      this.winnerArray = winningSquares;
    }
    return status;
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const { history, sortMoves, stepNumber } = this.state;
    const current = history[stepNumber];
    const status = this.gameStatus(current.squares);
    const location = this.winner_array ? this.winner_array : current.location;

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move ${move}` : "Go to game start";
      return (
        <li key={desc}>
          <button type="button" onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            location={location}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>
            {status}
          </div>
          <ol>
            {sortMoves ? moves : moves.reverse()}
          </ol>
        </div>
      </div>
    );
  }
}

export default Game;
