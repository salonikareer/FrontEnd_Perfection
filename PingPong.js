import React, { useState, useEffect, useCallback } from 'react';

const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
const BALL_SIZE = 15;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 400;

const PingPongGame = () => {
  const [ballPosition, setBallPosition] = useState({ x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 });
  const [ballVelocity, setBallVelocity] = useState({ x: 4, y: 4 });
  const [playerPosition, setPlayerPosition] = useState(GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const [aiPosition, setAiPosition] = useState(GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [lastHit, setLastHit] = useState(null);

  const movePaddle = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top - PADDLE_HEIGHT / 2;
    setPlayerPosition((prev) => {
      const newPos = Math.max(0, Math.min(y, GAME_HEIGHT - PADDLE_HEIGHT));
      // Add some smoothing to the paddle movement
      return prev + (newPos - prev) * 0.2;
    });
  }, []);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setBallPosition((prev) => ({
        x: prev.x + ballVelocity.x,
        y: prev.y + ballVelocity.y,
      }));

      // Improved AI movement with prediction and slight delay
      const aiTarget = ballPosition.y - PADDLE_HEIGHT / 2 + ballVelocity.y * 10;
      setAiPosition((prev) => {
        const newPos = Math.max(0, Math.min(aiTarget, GAME_HEIGHT - PADDLE_HEIGHT));
        return prev + (newPos - prev) * 0.1; // Slower AI movement
      });

      // Ball collision with top and bottom
      if (ballPosition.y <= 0 || ballPosition.y >= GAME_HEIGHT - BALL_SIZE) {
        setBallVelocity((prev) => ({ ...prev, y: -prev.y }));
      }

      // Ball collision with paddles
      if (
        (ballPosition.x <= PADDLE_WIDTH && 
         ballPosition.y + BALL_SIZE >= playerPosition && 
         ballPosition.y <= playerPosition + PADDLE_HEIGHT)
      ) {
        handlePaddleHit('player');
      } else if (
        (ballPosition.x >= GAME_WIDTH - PADDLE_WIDTH - BALL_SIZE && 
         ballPosition.y + BALL_SIZE >= aiPosition && 
         ballPosition.y <= aiPosition + PADDLE_HEIGHT)
      ) {
        handlePaddleHit('ai');
      }

      // Scoring
      if (ballPosition.x <= 0) {
        setAiScore((prev) => prev + 1);
        resetBall('ai');
      } else if (ballPosition.x >= GAME_WIDTH - BALL_SIZE) {
        setPlayerScore((prev) => prev + 1);
        resetBall('player');
      }
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [ballPosition, ballVelocity, playerPosition, aiPosition]);

  const handlePaddleHit = (paddle) => {
    setBallVelocity((prev) => {
      const speed = Math.sqrt(prev.x * prev.x + prev.y * prev.y);
      const direction = paddle === 'player' ? 1 : -1;
      const newAngle = (Math.random() - 0.5) * Math.PI / 4; // Random angle between -45 and 45 degrees
      return {
        x: direction * speed * Math.cos(newAngle) * 1.05, // Slight speed increase
        y: speed * Math.sin(newAngle),
      };
    });
    setLastHit(paddle);
  };

  const resetBall = (scorer) => {
    setBallPosition({ x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 });
    setBallVelocity({ 
      x: scorer === 'player' ? -4 : 4, 
      y: (Math.random() - 0.5) * 8 
    });
    setLastHit(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-4xl font-bold mb-4">
        <span className={playerScore > aiScore ? 'text-blue-500' : ''}>{playerScore}</span>
        {' - '}
        <span className={aiScore > playerScore ? 'text-red-500' : ''}>{aiScore}</span>
      </div>
      <div
        className="relative bg-gray-800 cursor-none overflow-hidden"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        onMouseMove={movePaddle}
      >
        {/* Player paddle */}
        <div
          className={`absolute bg-blue-500 transition-all duration-100 ${lastHit === 'player' ? 'animate-ping' : ''}`}
          style={{
            left: 0,
            top: playerPosition,
            width: PADDLE_WIDTH,
            height: PADDLE_HEIGHT,
          }}
        />
        {/* AI paddle */}
        <div
          className={`absolute bg-red-500 transition-all duration-100 ${lastHit === 'ai' ? 'animate-ping' : ''}`}
          style={{
            right: 0,
            top: aiPosition,
            width: PADDLE_WIDTH,
            height: PADDLE_HEIGHT,
          }}
        />
        {/* Ball */}
        <div
          className="absolute bg-white rounded-full shadow-glow transition-all duration-100"
          style={{
            left: ballPosition.x,
            top: ballPosition.y,
            width: BALL_SIZE,
            height: BALL_SIZE,
          }}
        />
        {/* Center line */}
        <div className="absolute left-1/2 top-0 w-0.5 h-full bg-gray-600 opacity-50" />
      </div>
    </div>
  );
};

export default PingPongGame;
