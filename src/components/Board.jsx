import React from 'react';
import Square from './Square';

function Board({ squares, onClick, winningLine }) {
  const renderSquare = (i) => {
    const isWinning = winningLine && winningLine.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinning={isWinning}
      />
    );
  };

  // tạo bàn cờ 3x3 bằng hai vòng lặp
  const board = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      board.push(renderSquare(row * 3 + col));
    }
  }

  return <div className="board">{board}</div>;
}

export default Board;
