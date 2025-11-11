import React from 'react';
import './App.css';
import TicTacToe from './components/TicTacToe';

function App() {
  return (
    <div className="app-container">
      <h1 className="title">🎮 Tic Tac Toe</h1>
      <TicTacToe />
    </div>
  );
}

export default App;