import React, { useState } from 'react';
import { Bell } from 'lucide-react';

const NotificationBadge = () => {
  const [count, setCount] = useState(1);
  const [position, setPosition] = useState('top-right');
  const [color, setColor] = useState('bg-red-500');
  const [size, setSize] = useState('normal');
  
  const positions = {
    'top-right': 'top-0 right-0 -translate-y-1/2 translate-x-1/2',
    'top-left': 'top-0 left-0 -translate-y-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-0 right-0 translate-y-1/2 translate-x-1/2',
    'bottom-left': 'bottom-0 left-0 translate-y-1/2 -translate-x-1/2'
  };

  const colors = {
    'bg-red-500': 'Red',
    'bg-blue-500': 'Blue',
    'bg-green-500': 'Green',
    'bg-yellow-500': 'Yellow',
    'bg-purple-500': 'Purple'
  };

  const sizes = {
    small: 'w-4 h-4 text-xs',
    normal: 'w-5 h-5 text-sm',
    large: 'w-6 h-6 text-base'
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="text-center font-semibold text-lg mb-4">
        Customizable Notification Badge
      </div>
      
      {/* Preview Section */}
      <div className="flex justify-center mb-8">
        <div className="relative inline-block">
          <Bell size={32} />
          {count > 0 && (
            <div className={`absolute ${positions[position]} ${color} ${sizes[size]} rounded-full flex items-center justify-center text-white font-bold`}>
              {count}
            </div>
          )}
        </div>
      </div>

      {/* Controls Section */}
      <div className="space-y-4">
        {/* Count Controls */}
        <div className="flex items-center justify-between">
          <span className="font-medium">Count:</span>
          <div className="space-x-2">
            <button 
              onClick={() => setCount(Math.max(0, count - 1))}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span className="mx-2">{count}</span>
            <button 
              onClick={() => setCount(count + 1)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>

        {/* Position Controls */}
        <div className="space-y-2">
          <span className="font-medium">Position:</span>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(positions).map((pos) => (
              <button
                key={pos}
                onClick={() => setPosition(pos)}
                className={`px-3 py-1 rounded ${
                  position === pos ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {pos.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Color Controls */}
        <div className="space-y-2">
          <span className="font-medium">Color:</span>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(colors).map(([colorClass, colorName]) => (
              <button
                key={colorClass}
                onClick={() => setColor(colorClass)}
                className={`px-3 py-1 rounded ${
                  colorClass === color ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {colorName}
              </button>
            ))}
          </div>
        </div>

        {/* Size Controls */}
        <div className="space-y-2">
          <span className="font-medium">Size:</span>
          <div className="grid grid-cols-3 gap-2">
            {Object.keys(sizes).map((sizeOption) => (
              <button
                key={sizeOption}
                onClick={() => setSize(sizeOption)}
                className={`px-3 py-1 rounded ${
                  size === sizeOption ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {sizeOption}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationBadge;
