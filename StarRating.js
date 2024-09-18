import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-green-400 via-blue-500 to-green-400">
      <div className="bg-white/30 backdrop-blur-md rounded-xl p-8 shadow-lg">
        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={64}
              className={`cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110 
                ${star <= (hover || rating) 
                  ? 'text-yellow-400 animate-pulse' 
                  : 'text-gray-300'
                }
                ${star === (hover || rating) ? 'scale-125' : ''}`
              }
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <div className="text-center text-white text-3xl font-bold">
          {rating ? `You rated: ${rating}/5` : 'Rate your experience!'}
        </div>
      </div>
    </div>
  );
};

export default StarRating;