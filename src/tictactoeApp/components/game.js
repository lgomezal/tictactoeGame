import React, { Component } from "react";
import Board from "./board";
import "../game.css";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null), location: [null] }],
      xIsNext: true,
      stepNumber: 0,
      sortMoves: true
    };
    this.winner_array = null;
  }

  handleClick = index => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];

    if (calculateWinner(squares) || squares[index]) return;
    squares[index] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares: squares, location: [index] }]), //Unlike the array push() method you might be more familiar with, the concat() method doesn’t mutate the original array, so we prefer it.
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  };

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  gameStatus = squares => {
    const winning_squares = calculateWinner(squares);
    let status;
    if (winning_squares) {
      status = `Winner: ${squares[winning_squares[0]]}`;
      this.winner_array = winning_squares;
    } else {
      status = squares.includes(null)
        ? `Next player is: ${this.state.xIsNext ? "X" : "O"}`
        : `Game draw!!!`;
      this.winner_array = winning_squares;
    }
    return status;
  };

  toggleMovesSort = () => {
    this.setState(previousState => ({ sortMoves: !previousState.sortMoves }));
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const status = this.gameStatus(current.squares);
    const location = this.winner_array ? this.winner_array : current.location;

    const moves = history.map((step, move) => {
      const desc = move
        ? `Go to move #${move} (${
            step.squares[step.location]
          } at row ${Math.floor(step.location / 3) +
            1} & coulmn ${(step.location % 3) + 1})`
        : `Go to game start`;
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            location={location}
            squares={current.squares}
            onClick={this.handleClick}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <button onClick={this.toggleMovesSort}>
              Sort moves by <b>{this.state.sortMoves ? "DESC" : "ASC"}</b>
            </button>
          </div>
          <ol>{this.state.sortMoves ? moves : moves.reverse()}</ol>
        </div>
      </div>
    );
  }
}

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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}

export default Game;
