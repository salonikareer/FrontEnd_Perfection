import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winLine, setWinLine] = useState(null);

  const calculateWinner = (squares) => {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinLine(lines[i]);
        return squares[a];
      }
    }
    return null;
  };

  useEffect(() => {
    const result = calculateWinner(board);
    setWinner(result);
  }, [board]);

  const handleClick = (i) => {
    if (winner || board[i]) return;
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => (
    <motion.button
      className={`w-24 h-24 text-5xl font-bold focus:outline-none ${
        board[i] === 'X' ? 'text-blue-500' : 'text-red-500'
      } ${winLine && winLine.includes(i) ? 'bg-yellow-200' : 'bg-white'}`}
      onClick={() => handleClick(i)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {board[i]}
    </motion.button>
  );

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (board.every(Boolean)) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setWinLine(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Tic Tac Toe</h1>
        <motion.div
          className="mb-6 text-2xl font-semibold text-center text-gray-700"
          key={status}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {status}
        </motion.div>
        <div className="grid grid-cols-3 gap-2 mb-6 bg-gray-300 p-2 rounded-lg">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-gray-300">
              {renderSquare(i)}
            </div>
          ))}
        </div>
        <motion.button
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xl font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md"
          onClick={resetGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reset Game
        </motion.button>
      </motion.div>
    </div>
  );
};

export default TicTacToe;