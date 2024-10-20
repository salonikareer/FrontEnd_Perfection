import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, User, Bot, RefreshCw } from 'lucide-react'

export default function CheckersGame() {
  const [board, setBoard] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [validMoves, setValidMoves] = useState([]);
  const [gameStatus, setGameStatus] = useState('Playing');
  const [capturedRed, setCapturedRed] = useState(0);
  const [capturedBlack, setCapturedBlack] = useState(0);
  const [gameMode, setGameMode] = useState('pvp');
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    initializeBoard();
  }, []);

  useEffect(() => {
    if (gameStatus === 'Playing' && currentPlayer === 'black' && gameMode !== 'pvp') {
      const timer = setTimeout(() => {
        makeBotMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameMode, board, gameStatus]);

  const initializeBoard = () => {
    const newBoard = Array(8).fill().map(() => Array(8).fill(null));
    
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 8; col++) {
        if ((row + col) % 2 === 1) {
          newBoard[row][col] = { color: 'black', isKing: false };
        }
      }
    }
    
    for (let row = 5; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if ((row + col) % 2 === 1) {
          newBoard[row][col] = { color: 'red', isKing: false };
        }
      }
    }
    
    setBoard(newBoard);
    setCurrentPlayer('red');
    setGameStatus('Playing');
    setCapturedRed(0);
    setCapturedBlack(0);
    setSelectedPiece(null);
    setValidMoves([]);
  };

  const evaluateBoard = (boardState) => {
    let score = 0;
    boardState.forEach((row, rowIndex) => {
      row.forEach((piece) => {
        if (piece) {
          let pieceValue = 10;
          if (piece.isKing) pieceValue = 20;
          
          if (piece.color === 'black') {
            pieceValue += rowIndex;
            score += pieceValue;
          } else {
            pieceValue += (7 - rowIndex);
            score -= pieceValue;
          }
          
          const colCenter = Math.abs(3.5 - rowIndex);
          if (colCenter <= 2) {
            score += piece.color === 'black' ? 2 : -2;
          }
        }
      });
    });
    return score;
  };

  const getValidMovesForPiece = (row, col, piece, boardState) => {
    const moves = [];
    const jumps = [];
    const directions = piece.isKing ? [-1, 1] : piece.color === 'red' ? [-1] : [1];

    directions.forEach(rowDir => {
      [-1, 1].forEach(colDir => {
        const newRow = row + rowDir;
        const newCol = col + colDir;
        const jumpRow = row + (rowDir * 2);
        const jumpCol = col + (colDir * 2);

        if (isValidPosition(newRow, newCol) && !boardState[newRow][newCol]) {
          moves.push({ row: newRow, col: newCol });
        }

        if (isValidPosition(jumpRow, jumpCol) && 
            !boardState[jumpRow][jumpCol] && 
            boardState[newRow][newCol] && 
            boardState[newRow][newCol].color !== piece.color) {
          jumps.push({ row: jumpRow, col: jumpCol, captured: { row: newRow, col: newCol } });
        }
      });
    });

    return jumps.length > 0 ? jumps : moves;
  };

  const getAllPossibleMoves = (boardState, player) => {
    const moves = [];
    const jumps = [];

    boardState.forEach((row, rowIndex) => {
      row.forEach((piece, colIndex) => {
        if (piece && piece.color === player) {
          const pieceMoves = getValidMovesForPiece(rowIndex, colIndex, piece, boardState);
          pieceMoves.forEach(move => {
            if (move.captured) {
              jumps.push({
                start: { row: rowIndex, col: colIndex },
                end: move
              });
            } else {
              moves.push({
                start: { row: rowIndex, col: colIndex },
                end: move
              });
            }
          });
        }
      });
    });

    return jumps.length > 0 ? jumps : moves;
  };

  const minimax = (boardState, depth, alpha, beta, maximizingPlayer) => {
    if (depth === 0) return evaluateBoard(boardState);

    const moves = getAllPossibleMoves(boardState, maximizingPlayer ? 'black' : 'red');
    
    if (moves.length === 0) return maximizingPlayer ? -1000 : 1000;

    if (maximizingPlayer) {
      let maxEval = -Infinity;
      for (const move of moves) {
        const newBoard = simulateMove(boardState, move);
        const eval = minimax(newBoard, depth - 1, alpha, beta, false);
        maxEval = Math.max(maxEval, eval);
        alpha = Math.max(alpha, eval);
        if (beta <= alpha) break;
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const move of moves) {
        const newBoard = simulateMove(boardState, move);
        const eval = minimax(newBoard, depth - 1, alpha, beta, true);
        minEval = Math.min(minEval, eval);
        beta = Math.min(beta, eval);
        if (beta <= alpha) break;
      }
      return minEval;
    }
  };

  const simulateMove = (boardState, move) => {
    const newBoard = boardState.map(row => [...row]);
    const piece = { ...newBoard[move.start.row][move.start.col] };
    
    if ((piece.color === 'red' && move.end.row === 0) || 
        (piece.color === 'black' && move.end.row === 7)) {
      piece.isKing = true;
    }
    
    newBoard[move.end.row][move.end.col] = piece;
    newBoard[move.start.row][move.start.col] = null;
    
    if (move.end.captured) {
      newBoard[move.end.captured.row][move.end.captured.col] = null;
    }
    
    return newBoard;
  };

  const makeBotMove = () => {
    setIsThinking(true);
    
    const depth = {
      easy: 2,
      medium: 3,
      hard: 4
    }[gameMode];

    const moves = getAllPossibleMoves(board, 'black');
    
    if (moves.length === 0) {
      setGameStatus('Red Wins!');
      setIsThinking(false);
      return;
    }

    let bestMove = moves[0];
    let bestValue = -Infinity;

    for (const move of moves) {
      const newBoard = simulateMove(board, move);
      const value = minimax(newBoard, depth - 1, -Infinity, Infinity, false);
      
      if (value > bestValue) {
        bestValue = value;
        bestMove = move;
      }
    }

    const newBoard = simulateMove(board, bestMove);
    if (bestMove.end.captured) {
      setCapturedRed(prev => prev + 1);
    }
    
    setBoard(newBoard);
    setCurrentPlayer('red');
    setIsThinking(false);
    
    checkGameEnd(newBoard);
  };

  const isValidPosition = (row, col) => {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  };

  const handleSquareClick = (row, col) => {
    if (gameStatus !== 'Playing' || 
        (currentPlayer === 'black' && gameMode !== 'pvp') ||
        isThinking) return;

    const piece = board[row][col];
    
    if (piece && piece.color === currentPlayer && !selectedPiece) {
      const moves = getValidMovesForPiece(row, col, piece, board);
      if (moves.length > 0) {
        setSelectedPiece({ row, col });
        setValidMoves(moves);
      }
      return;
    }

    if (selectedPiece && validMoves.some(move => move.row === row && move.col === col)) {
      makePlayerMove(row, col);
      return;
    }

    setSelectedPiece(null);
    setValidMoves([]);
  };

  const makePlayerMove = (newRow, newCol) => {
    const newBoard = board.map(row => [...row]);
    const piece = { ...newBoard[selectedPiece.row][selectedPiece.col] };
    
    if ((piece.color === 'red' && newRow === 0) || 
        (piece.color === 'black' && newRow === 7)) {
      piece.isKing = true;
    }

    newBoard[newRow][newCol] = piece;
    newBoard[selectedPiece.row][selectedPiece.col] = null;

    const move = validMoves.find(m => m.row === newRow && m.col === newCol);
    if (move.captured) {
      newBoard[move.captured.row][move.captured.col] = null;
      setCapturedBlack(prev => prev + 1);
    }

    setBoard(newBoard);
    setSelectedPiece(null);
    setValidMoves([]);
    setCurrentPlayer('black');

    checkGameEnd(newBoard);
  };

  const checkGameEnd = (newBoard) => {
    let redCount = 0;
    let blackCount = 0;

    newBoard.forEach(row => {
      row.forEach(piece => {
        if (piece) {
          if (piece.color === 'red') redCount++;
          if (piece.color === 'black') blackCount++;
        }
      });
    });

    if (redCount === 0) setGameStatus('Black Wins!');
    if (blackCount === 0) setGameStatus('Red Wins!');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">Checkers Game</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <div className="flex justify-between w-full">
          <div className="flex items-center space-x-2">
            <Badge variant={currentPlayer === 'red' ? "destructive" : "outline"}>
              {gameMode === 'pvp' ? <User className="w-4 h-4 mr-1" /> : <Bot className="w-4 h-4 mr-1" />}
              Red: {12 - capturedRed}
            </Badge>
          </div>
          <div className="text-xl font-semibold">
            {gameStatus === 'Playing' 
              ? isThinking 
                ? "AI is thinking..." 
                : `Current Turn: ${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}` 
              : gameStatus}
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={currentPlayer === 'black' ? "default" : "outline"}>
              {gameMode === 'pvp' ? <User className="w-4 h-4 mr-1" /> : <Bot className="w-4 h-4 mr-1" />}
              Black: {12 - capturedBlack}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-8 gap-1 p-2 bg-secondary rounded-lg">
          {board.map((row, rowIndex) => (
            row.map((piece, colIndex) => {
              const isValidMove = validMoves.some(
                move => move.row === rowIndex && move.col === colIndex
              );
              const isSelected = selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex;

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                  className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center cursor-pointer rounded-md transition-all duration-200 ease-in-out
                    ${(rowIndex + colIndex) % 2 === 0 ? 'bg-primary-foreground' : 'bg-primary'}
                    ${isValidMove ? 'bg-green-400' : ''}
                    ${isSelected ? 'bg-blue-400' : ''}
                    hover:opacity-80`}
                >
                  {piece && (
                    <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 flex items-center justify-center
                      ${piece.color === 'red' ? 'bg-red-600' : 'bg-gray-800'}
                      ${piece.isKing ? 'border-yellow-400 border-4' : 'border-white'}
                      transform transition-transform hover:scale-105`}
                    >
                      {piece.isKing && <Crown className="w-6 h-6 text-yellow-400" />}
                    </div>
                  )}
                </div>
              );
            })
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <Button
            onClick={() => {
              setGameMode('pvp');
              initializeBoard();
            }}
            variant={gameMode === 'pvp' ? "default" : "outline"}
          >
            2 Players
          </Button>
          <Button
            onClick={() => {
              setGameMode('easy');
              initializeBoard();
            }}
            variant={gameMode === 'easy' ? "default" : "outline"}
          
          >
            Easy Bot
          </Button>
          <Button
            onClick={() => {
              setGameMode('medium');
              initializeBoard();
            }}
            variant={gameMode === 'medium' ? "default" : "outline"}
          >
            Medium Bot
          </Button>
          <Button
            onClick={() => {
              setGameMode('hard');
              initializeBoard();
            }}
            variant={gameMode === 'hard' ? "default" : "outline"}
          >
            Hard Bot
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={initializeBoard} variant="secondary">
          <RefreshCw className="w-4 h-4 mr-2" />
          New Game
        </Button>
      </CardFooter>
    </Card>
  );
}
