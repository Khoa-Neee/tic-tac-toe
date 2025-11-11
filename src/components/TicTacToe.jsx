import React, { useState } from 'react';
import Board from './Board';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

function TicTacToe() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), move: null }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [ascending, setAscending] = useState(true);

  const current = history[stepNumber];
  const result = calculateWinner(current.squares);
  const winner = result ? result.winner : null;

  const handleClick = (i) => {
    const hist = history.slice(0, stepNumber + 1);
    const squares = current.squares.slice();
    if (winner || squares[i]) return;
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(hist.concat([{ squares, move: i }]));
    setStepNumber(hist.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (move) => {
    setStepNumber(move);
    setXIsNext(move % 2 === 0);
  };

  const resetGame = () => {
    setHistory([{ squares: Array(9).fill(null), move: null }]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const moves = history.map((step, move) => {
    const col = step.move !== null ? (step.move % 3) + 1 : null;
    const row = step.move !== null ? Math.floor(step.move / 3) + 1 : null;
    const desc = move
      ? `Go to move #${move} (${row}, ${col})`
      : 'Go to game start';
    if (move === stepNumber) {
      return (
        <li key={move}>
          <span>You are at move #{move}</span>
        </li>
      );
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  const sortedMoves = ascending ? moves : [...moves].reverse();

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (stepNumber === 9) {
    status = 'Result: Draw';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game-layout">
      <div className="left-panel">
        <Board squares={current.squares} onClick={handleClick} winningLine={result?.line} />
      </div>

      <div className="right-panel">
        <div className="info">{status}</div>
        <div className="buttons">
          <button onClick={() => setAscending(!ascending)}>
            Sort {ascending ? 'Descending' : 'Ascending'}
          </button>
          <button onClick={resetGame}>New Game 🔁</button>
        </div>
        <ol className="moves">{sortedMoves}</ol>
      </div>
    </div>
  );
}

export default TicTacToe;
