import React, { useState, useEffect, useRef } from 'react';

// Constants
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const BASKET_WIDTH = 100;
const BASKET_HEIGHT = 50;
const ITEM_SIZE = 30;
const BASE_FALL_SPEED = 2;
const GAME_DURATION = 400000; // seconds

const images = {
  goldCoin: './gold.png',
  silverCoin: './silver.png',
  bronzeCoin: './bronze.png',
  timeBoost: 'https://uxwing.com/wp-content/themes/uxwing/download/time-and-date/stopwatch-icon.png',
  scoreMultiplier: './power.png',
  basket: './basket.png',
  obstacle: 'https://uxwing.com/wp-content/themes/uxwing/download/signs-and-symbols/warning-icon.png',
};

const sounds = {
  coinCollect: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3',
  powerUp: 'https://assets.mixkit.co/active_storage/sfx/2020/2020-preview.mp3',
  gameOver: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3',
};

const GoldCoinDropGame = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [basketPosition, setBasketPosition] = useState(GAME_WIDTH / 2 - BASKET_WIDTH / 2);
  const [items, setItems] = useState([]);
  const [scoreMultiplier, setScoreMultiplier] = useState(1);

  const gameAreaRef = useRef(null);
  const soundRefs = useRef({});

  useEffect(() => {
    const storedHighScore = localStorage.getItem('highScore');
    if (storedHighScore) setHighScore(parseInt(storedHighScore));

    const handleMouseMove = (e) => {
      if (gameAreaRef.current) {
        const gameAreaRect = gameAreaRef.current.getBoundingClientRect();
        const relativeX = e.clientX - gameAreaRect.left;
        setBasketPosition(Math.max(0, Math.min(relativeX - BASKET_WIDTH / 2, GAME_WIDTH - BASKET_WIDTH)));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let gameLoop;

    if (gameStarted && !gameOver) {
      gameLoop = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(gameLoop);
            endGame();
            return 0;
          }
          return prevTime - 1;
        });

        setItems((prevItems) => {
          const fallSpeed = BASE_FALL_SPEED + (level - 1) * 0.5;
          const newItems = prevItems.map((item) => ({ ...item, y: item.y + fallSpeed }));

          newItems.forEach((item) => {
            if (
              item.y + ITEM_SIZE > GAME_HEIGHT - BASKET_HEIGHT &&
              item.x + ITEM_SIZE > basketPosition &&
              item.x < basketPosition + BASKET_WIDTH
            ) {
              if (item.type === 'obstacle') {
                endGame();
              } else {
                collectItem(item);
              }
              item.y = -ITEM_SIZE; // Reset item position to the top
            }
          });

          const remainingItems = newItems.filter((item) => item.y < GAME_HEIGHT);

          // Spawn a new item with a 5% chance each loop iteration
          if (Math.random() < 0.05) {
            remainingItems.push(createRandomItem());
          }

          return remainingItems;
        });

        // Increase level every 15 seconds
        if (timeLeft % 15 === 0 && timeLeft !== GAME_DURATION) {
          setLevel((prevLevel) => prevLevel + 1);
        }
      }, 16);
    }

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, basketPosition, level, timeLeft]);

  const createRandomItem = () => {
    const types = ['goldCoin', 'silverCoin', 'bronzeCoin', 'timeBoost', 'scoreMultiplier', 'obstacle'];
    const weights = [10, 20, 30, 5, 5, 10];
    const randomType = weightedRandomChoice(types, weights);
    return {
      x: Math.random() * (GAME_WIDTH - ITEM_SIZE),
      y: -ITEM_SIZE,
      id: Date.now(),
      type: randomType,
    };
  };

  const weightedRandomChoice = (items, weights) => {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;
    for (let i = 0; i < items.length; i++) {
      if (random < weights[i]) {
        return items[i];
      }
      random -= weights[i];
    }
    return items[items.length - 1];
  };

  const collectItem = (item) => {
    switch (item.type) {
      case 'goldCoin':
        setScore((prevScore) => prevScore + 3 * scoreMultiplier);
        break;
      case 'silverCoin':
        setScore((prevScore) => prevScore + 2 * scoreMultiplier);
        break;
      case 'bronzeCoin':
        setScore((prevScore) => prevScore + 1 * scoreMultiplier);
        break;
      case 'timeBoost':
        setTimeLeft((prevTime) => Math.min(prevTime + 5, GAME_DURATION));
        break;
      case 'scoreMultiplier':
        setScoreMultiplier(2);
        setTimeout(() => setScoreMultiplier(1), 5000);
        break;
      default:
        break;
    }
    playSound(item.type === 'timeBoost' || item.type === 'scoreMultiplier' ? 'powerUp' : 'coinCollect');
  };

  const playSound = (soundType) => {
    if (soundRefs.current[soundType]) {
      soundRefs.current[soundType].currentTime = 0;
      soundRefs.current[soundType].play();
    }
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameOver(false);
    setGameStarted(true);
    setItems([]);
    setLevel(1);
    setScoreMultiplier(1);
  };

  const endGame = () => {
    setGameOver(true);
    setGameStarted(false);
    playSound('gameOver');
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', score.toString());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-yellow-200 to-yellow-500 p-4">
      <h1 className="text-4xl font-bold mb-4 text-yellow-800">Gold Coin Drop Game</h1>
      <div className="mb-2 text-xl font-bold text-yellow-800">Level: {level}</div>
      <div className="mb-2 text-xl font-bold text-yellow-800">Time: {timeLeft}s</div>
      <div className="mb-2 text-xl font-bold text-yellow-800">Score: {score} (x{scoreMultiplier})</div>
      <div className="mb-4 text-xl font-bold text-yellow-800">High Score: {highScore}</div>
      <div
        ref={gameAreaRef}
        className="relative bg-blue-100 border-4 border-yellow-600 rounded-lg overflow-hidden"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      >
        {items.map((item) => (
          <img
            key={item.id}
            src={images[item.type]}
            alt={item.type}
            className="absolute"
            style={{
              width: ITEM_SIZE,
              height: ITEM_SIZE,
              left: item.x,
              top: item.y,
            }}
          />
        ))}
        <img
          src={images.basket}
          alt="Basket"
          className="absolute bottom-0"
          style={{
            width: BASKET_WIDTH,
            height: BASKET_HEIGHT,
            left: basketPosition,
          }}
        />
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <button onClick={startGame} className="text-2xl p-4 bg-yellow-600 text-white rounded-md">
              Start Game
            </button>
          </div>
        )}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
            <p className="text-3xl font-bold text-white mb-4">Game Over!</p>
            <button onClick={startGame} className="text-2xl p-4 bg-yellow-600 text-white rounded-md">
              Play Again
            </button>
          </div>
        )}
      </div>
      {Object.entries(sounds).map(([key, src]) => (
        <audio key={key} ref={(el) => (soundRefs.current[key] = el)} src={src} />
      ))}
      <p className="mt-4 text-yellow-800 text-center">
        Move your mouse to control the basket and catch the falling items!
        <br />
        Avoid the obstacles and collect power-ups to boost your score!
      </p>
    </div>
  );
};

export default GoldCoinDropGame;
