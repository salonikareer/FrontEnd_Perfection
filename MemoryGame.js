import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵']

const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function MemoryGame() {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [solved, setSolved] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [moves, setMoves] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [difficulty, setDifficulty] = useState(16) // Default to 16 cards

  useEffect(() => {
    initializeGame()
  }, [difficulty])

  const initializeGame = () => {
    const selectedEmojis = emojis.slice(0, difficulty / 2)
    const shuffledCards = shuffleArray([...selectedEmojis, ...selectedEmojis])
    setCards(shuffledCards)
    setFlipped([])
    setSolved([])
    setDisabled(false)
    setMoves(0)
    setGameOver(false)
  }

  const handleCardClick = (index) => {
    if (flipped.length === 0) {
      setFlipped([index])
      return
    }

    if (flipped.length === 1) {
      setDisabled(true)
      setFlipped([...flipped, index])
      setMoves(moves + 1)

      if (cards[flipped[0]] === cards[index]) {
        setSolved([...solved, flipped[0], index])
        setFlipped([])
        setDisabled(false)
      } else {
        setTimeout(() => {
          setFlipped([])
          setDisabled(false)
        }, 1000)
      }

      if (solved.length + 2 === cards.length) {
        setGameOver(true)
      }
    }
  }

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Memory Game</h1>
      <div className="bg-white p-8 rounded-lg shadow-2xl">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <span className="font-bold">Moves:</span> {moves}
          </div>
          <div>
            <label htmlFor="difficulty" className="mr-2 font-bold">Difficulty:</label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => handleDifficultyChange(Number(e.target.value))}
              className="p-2 rounded border"
            >
              <option value={16}>Easy (16 cards)</option>
              <option value={24}>Medium (24 cards)</option>
              <option value={30}>Hard (30 cards)</option>
            </select>
          </div>
        </div>
        <div className={`grid gap-4 ${difficulty === 16 ? 'grid-cols-4' : difficulty === 24 ? 'grid-cols-6' : 'grid-cols-6'}`}>
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className={`w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-4xl cursor-pointer ${
                flipped.includes(index) || solved.includes(index) ? '' : 'bg-gray-400'
              }`}
              onClick={() => !disabled && !flipped.includes(index) && !solved.includes(index) && handleCardClick(index)}
              animate={{ rotateY: flipped.includes(index) || solved.includes(index) ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute backface-hidden">
                {flipped.includes(index) || solved.includes(index) ? card : '?'}
              </div>
            </motion.div>
          ))}
        </div>
        {gameOver && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Congratulations! You won!</h2>
            <p className="mb-4">You completed the game in {moves} moves.</p>
            <button
              onClick={initializeGame}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
