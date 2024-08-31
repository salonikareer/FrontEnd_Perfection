import React, { useState, useEffect } from 'react';
import { RefreshCw, Eye, EyeOff } from 'lucide-react';

const puzzles = {
  easy: [
    [5,3,0,0,7,0,0,0,0,6,0,0,1,9,5,0,0,0,0,9,8,0,0,0,0,6,0,8,0,0,0,6,0,0,0,3,4,0,0,8,0,3,0,0,1,7,0,0,0,2,0,0,0,6,0,6,0,0,0,0,2,8,0,0,0,0,4,1,9,0,0,5,0,0,0,0,8,0,0,7,9],
    [3,0,6,5,0,8,4,0,0,5,2,0,0,0,0,0,0,0,0,8,7,0,0,0,0,3,1,0,0,3,0,1,0,0,8,0,9,0,0,8,6,3,0,0,5,0,5,0,0,9,0,6,0,0,1,3,0,0,0,0,2,5,0,0,0,0,0,0,0,0,7,4,0,0,5,2,0,6,3,0,0]
  ],
  medium: [
    [5,3,0,0,7,0,0,0,0,6,0,0,1,9,5,0,0,0,0,9,8,0,0,0,0,6,0,8,0,0,0,6,0,0,0,3,4,0,0,8,0,3,0,0,1,7,0,0,0,2,0,0,0,6,0,6,0,0,0,0,2,8,0,0,0,0,4,1,9,0,0,5,0,0,0,0,8,0,0,7,9],
    [0,0,0,2,6,0,7,0,1,6,8,0,0,7,0,0,9,0,1,9,0,0,0,4,5,0,0,8,2,0,1,0,0,0,4,0,0,0,4,6,0,2,9,0,0,0,5,0,0,0,3,0,2,8,0,0,9,3,0,0,0,7,4,0,4,0,0,5,0,0,3,6,7,0,3,0,1,8,0,0,0]
  ],
  hard: [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,8,5,0,0,1,0,2,0,0,0,0,0,0,0,5,0,7,0,0,0,0,0,4,0,0,0,1,0,0,0,9,0,0,0,0,0,0,0,5,0,0,0,0,0,0,7,3,0,0,2,0,1,0,0,0,0,0,0,0,0,4,0,0,0,9],
    [1,0,0,0,0,7,0,9,0,0,3,0,0,2,0,0,0,8,0,0,9,6,0,0,5,0,0,0,0,5,3,0,0,9,0,0,0,1,0,0,8,0,0,0,2,6,0,0,0,0,4,0,0,0,3,0,0,0,0,0,0,1,0,0,4,0,0,0,0,0,0,7,0,0,7,0,0,0,3,0,0]
  ]
};

const solutions = {
  easy: [
    [5,3,4,6,7,8,9,1,2,6,7,2,1,9,5,3,4,8,1,9,8,3,4,2,5,6,7,8,5,9,7,6,1,4,2,3,4,2,6,8,5,3,7,9,1,7,1,3,9,2,4,8,5,6,9,6,1,5,3,7,2,8,4,2,8,7,4,1,9,6,3,5,3,4,5,2,8,6,1,7,9],
    [3,1,6,5,7,8,4,9,2,5,2,9,1,3,4,7,6,8,4,8,7,6,2,9,5,3,1,2,6,3,4,1,5,9,8,7,9,7,4,8,6,3,1,2,5,8,5,1,7,9,2,6,4,3,1,3,8,9,4,7,2,5,6,6,9,2,3,5,1,8,7,4,7,4,5,2,8,6,3,1,9]
  ],
  medium: [
    [5,3,4,6,7,8,9,1,2,6,7,2,1,9,5,3,4,8,1,9,8,3,4,2,5,6,7,8,5,9,7,6,1,4,2,3,4,2,6,8,5,3,7,9,1,7,1,3,9,2,4,8,5,6,9,6,1,5,3,7,2,8,4,2,8,7,4,1,9,6,3,5,3,4,5,2,8,6,1,7,9],
    [4,3,5,2,6,9,7,8,1,6,8,2,5,7,1,4,9,3,1,9,7,8,3,4,5,6,2,8,2,6,1,9,5,3,4,7,3,7,4,6,8,2,9,1,5,9,5,1,7,4,3,6,2,8,5,1,9,3,2,6,8,7,4,2,4,8,9,5,7,1,3,6,7,6,3,4,1,8,2,5,9]
  ],
  hard: [
    [9,8,7,6,5,4,3,2,1,2,4,6,1,7,3,9,8,5,3,5,1,9,2,8,7,4,6,1,2,8,5,3,7,6,9,4,6,3,4,8,9,2,1,5,7,7,9,5,4,6,1,8,3,2,5,1,9,2,8,6,4,7,3,4,7,2,3,1,9,5,6,8,8,6,3,7,4,5,2,1,9],
    [1,6,2,8,5,7,4,9,3,5,3,4,1,2,9,6,7,8,7,8,9,6,4,3,5,2,1,4,7,5,3,1,2,9,8,6,9,1,3,5,8,6,7,4,2,6,2,8,7,9,4,1,3,5,3,5,6,4,7,8,2,1,9,2,4,1,9,3,5,8,6,7,8,9,7,2,6,1,3,5,4]
  ]
};

const SudokuBoard = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [board, setBoard] = useState([]);
  const [errors, setErrors] = useState({});
  const [showSolution, setShowSolution] = useState(false);
  const [puzzleIndex, setPuzzleIndex] = useState(0);

  useEffect(() => {
    resetGame();
  }, [difficulty]);

  const isValid = (row, col, num) => {
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num || board[x][col] === num) return false;
    }
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxRow + i][boxCol + j] === num) return false;
      }
    }
    return true;
  };

  const handleInput = (row, col, value) => {
    if (puzzles[difficulty][puzzleIndex][row * 9 + col] !== 0) return;

    const newValue = value === '' ? 0 : parseInt(value, 10);
    if (isNaN(newValue) || newValue < 0 || newValue > 9) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = newValue;
    setBoard(newBoard);

    if (newValue !== 0 && !isValid(row, col, newValue)) {
      setErrors({ ...errors, [`${row}-${col}`]: true });
    } else {
      const newErrors = { ...errors };
      delete newErrors[`${row}-${col}`];
      setErrors(newErrors);
    }
  };

  const resetGame = () => {
    const newPuzzleIndex = Math.floor(Math.random() * puzzles[difficulty].length);
    setPuzzleIndex(newPuzzleIndex);
    const newBoard = [];
    for (let i = 0; i < 9; i++) {
      newBoard.push(puzzles[difficulty][newPuzzleIndex].slice(i * 9, (i + 1) * 9));
    }
    setBoard(newBoard);
    setErrors({});
    setShowSolution(false);
  };

  const toggleSolution = () => {
    setShowSolution(!showSolution);
  };

  const Cell = ({ row, col, value, isFixed }) => (
    <input
      type="number"
      min="1"
      max="9"
      value={showSolution ? solutions[difficulty][puzzleIndex][row * 9 + col] : (value === 0 ? '' : value)}
      onChange={(e) => handleInput(row, col, e.target.value)}
      className={`w-9 h-9 text-center text-lg font-bold border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400
                  ${isFixed ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-600'}
                  ${errors[`${row}-${col}`] ? 'bg-red-100 text-red-600' : ''}`}
      readOnly={isFixed || showSolution}
    />
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-pink-500 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="flex justify-between mb-4">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="px-2 py-1 border rounded"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button
            onClick={toggleSolution}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 flex items-center"
          >
            {showSolution ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="grid grid-cols-9 gap-0.5 bg-gray-300 p-0.5 rounded mb-4">
          {board.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                row={rowIndex}
                col={colIndex}
                value={cell}
                isFixed={puzzles[difficulty][puzzleIndex][rowIndex * 9 + colIndex] !== 0}
              />
            ))
          ))}
        </div>
        <button
          onClick={resetGame}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center"
        >
          <RefreshCw className="mr-2" size={20} /> New Game
        </button>
      </div>
      <div className="mt-6 text-white text-2xl font-bold text-center">
        Sudoku Challenge
      </div>
      <div className="mt-2 text-white text-sm text-center">
        Choose your difficulty and test your skills!
      </div>
    </div>
  );
};

export default SudokuBoard;