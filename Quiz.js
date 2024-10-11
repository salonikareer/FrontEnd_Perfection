import React, { useState, useEffect, useCallback } from 'react';
import { BarChart, Clock, Star, CheckCircle, XCircle } from 'lucide-react';

const questions = [
  {
    id: 1,
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
    difficulty: "easy"
  },
  {
    id: 2,
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
    difficulty: "easy"
  },
  {
    id: 3,
    text: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
    difficulty: "medium"
  },
  {
    id: 4,
    text: "In which year did World War II end?",
    options: ["1943", "1945", "1947", "1950"],
    correctAnswer: "1945",
    difficulty: "medium"
  },
  {
    id: 5,
    text: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: "Au",
    difficulty: "hard"
  }
];

const InteractiveQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [timeTaken, setTimeTaken] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    let timer;
    if (!quizCompleted) {
      timer = setInterval(() => {
        setTimeTaken((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizCompleted]);

  const handleAnswer = useCallback((answer) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === currentQuestion.correctAnswer) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
      setFeedback('Correct! Well done!');
    } else {
      setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
      setFeedback(`Incorrect. The correct answer was ${currentQuestion.correctAnswer}.`);
    }
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);

    if (currentQuestionIndex === questions.length - 1) {
      setQuizCompleted(true);
    }
  }, [currentQuestion, isAnswered, currentQuestionIndex]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowFeedback(false);
    }
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <BarChart className="mr-2" />
          <span className="font-bold">Question Progress</span>
        </div>
        <div className="flex items-center">
          <Clock className="mr-2" />
          <span className="font-bold">
            Time: {timeTaken}s
          </span>
        </div>
      </div>

      <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-blue-500 transition-all duration-1000 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <span className="font-bold text-gray-700">
            {currentQuestionIndex + 1} / {questions.length}
          </span>
        </div>
      </div>

      {!quizCompleted && currentQuestion && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">{currentQuestion.text}</h2>
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`w-full p-3 text-left rounded ${
                    selectedAnswer === option
                      ? option === currentQuestion.correctAnswer
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : isAnswered && option === currentQuestion.correctAnswer
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  } ${isAnswered ? 'cursor-not-allowed' : 'cursor-pointer'} transition-all duration-300`}
                  disabled={isAnswered}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center mb-4">
            <Star className={`mr-2 text-${currentQuestion.difficulty === 'easy' ? 'green' : currentQuestion.difficulty === 'medium' ? 'yellow' : 'red'}-500`} />
            <span className="font-bold capitalize">{currentQuestion.difficulty}</span>
          </div>

          {showFeedback && (
            <div className={`mt-4 p-3 rounded-lg animate-fade-in ${selectedAnswer === currentQuestion.correctAnswer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <p className="text-sm">{feedback}</p>
            </div>
          )}

          {isAnswered && currentQuestionIndex < questions.length - 1 && (
            <button 
              onClick={handleNextQuestion}
              className="mt-4 w-full bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
            >
              Next Question
            </button>
          )}
        </>
      )}

      {quizCompleted && (
        <div className="mt-4 p-4 bg-green-100 rounded-lg text-center animate-fade-in">
          <h3 className="text-xl font-bold text-green-800">Quiz Completed!</h3>
          <p className="text-green-700">You got {score.correct} out of {questions.length} correct</p>
          <p className="text-green-700">Time taken: {timeTaken} seconds</p>
        </div>
      )}

      <div className="mt-4 flex justify-between">
        <div className="flex items-center">
          <CheckCircle className="text-green-500 mr-1" size={16} />
          <span className="text-sm">Correct: {score.correct}</span>
        </div>
        <div className="flex items-center">
          <XCircle className="text-red-500 mr-1" size={16} />
          <span className="text-sm">Incorrect: {score.incorrect}</span>
        </div>
      </div>
    </div>
  );
};

// Example usage
const QuizExample = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <InteractiveQuiz />
    </div>
  );
};

export default QuizExample;
