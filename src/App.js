import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Game from "./tictactoeApp/components/game";

export const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Tic-Tac-Toe</h1>
    </header>
    <div className="game-body">
      <Game />
    </div>
  </div>
);

export default App;
