import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Github, Loader2 } from 'lucide-react';

const ToggleButton = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <button
      className={`bg-gray-300 relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${enabled ? 'bg-green-500' : ''}`}
      onClick={() => setEnabled(!enabled)}
    >
      <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
};

const buttons = [
  {
    type: 'Primary',
    description: 'Used for main actions, draws attention',
    className: 'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105',
    icon: '🎯',
    component: ({className}) => <button className={className}>Primary Button</button>
  },
  {
    type: 'Secondary',
    description: 'Used for secondary actions, less prominent',
    className: 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105',
    icon: '🔸',
    component: ({className}) => <button className={className}>Secondary Button</button>
  },
  {
    type: 'Tertiary',
    description: 'Least prominent, often used for supportive actions',
    className: 'bg-transparent hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded transition duration-300 ease-in-out transform hover:scale-105',
    icon: '📌',
    component: ({className}) => <button className={className}>Tertiary Button</button>
  },
  {
    type: 'Icon',
    description: 'Compact button with only an icon',
    className: 'bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full transition duration-300 ease-in-out transform hover:scale-110',
    icon: '🔣',
    component: ({className}) => <button className={className}><Github size={24} /></button>
  },
  {
    type: 'Floating Action Button (FAB)',
    description: 'Prominent button for primary action, usually fixed position',
    className: 'bg-pink-500 hover:bg-pink-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition duration-300 ease-in-out transform hover:scale-110',
    icon: '🚀',
    component: ({className}) => <button className={className}>+</button>
  },
  {
    type: 'Ghost',
    description: 'Very subtle button, often used in complex interfaces',
    className: 'text-blue-500 hover:bg-blue-100 font-semibold py-2 px-4 rounded transition duration-300 ease-in-out',
    icon: '👻',
    component: ({className}) => <button className={className}>Ghost Button</button>
  },
  {
    type: 'Toggle',
    description: 'Switches between two states',
    className: 'bg-gray-300 relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none',
    icon: '🔛',
    component: ToggleButton
  },
  {
    type: 'Loading',
    description: 'Indicates a processing state',
    className: 'bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out',
    icon: '⏳',
    component: ({className}) => (
      <button className={className}>
        <Loader2 className="animate-spin mr-2" size={20} />
        Loading...
      </button>
    )
  },
  {
    type: 'Split',
    description: 'Combines a default action with additional options',
    className: 'inline-flex rounded-md shadow-sm',
    icon: '✂️',
    component: () => (
      <div className="inline-flex rounded-md shadow-sm">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-l transition duration-300 ease-in-out">
          Split Button
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded-r border-l border-blue-400 transition duration-300 ease-in-out">
          ▼
        </button>
      </div>
    )
  },
  {
    type: 'Social',
    description: 'Used for social media actions or logins',
    className: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out transform hover:scale-105',
    icon: '🌐',
    component: ({className}) => (
      <button className={className}>
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
        </svg>
        Sign in with Google
      </button>
    )
  },
];

const ButtonShowcaseCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % buttons.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + buttons.length) % buttons.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const currentButton = buttons[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Button Showcase</h1>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <button onClick={prevSlide} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-2xl font-semibold text-gray-800">{currentButton.type}</h2>
          <button onClick={nextSlide} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="flex flex-col items-center space-y-8">
          <div className="text-6xl mb-4">{currentButton.icon}</div>
          <div className="flex justify-center items-center h-20">
            {React.createElement(currentButton.component, {className: currentButton.className})}
          </div>
          <p className="text-gray-600 text-center">{currentButton.description}</p>
          <div className="bg-gray-100 p-4 rounded-md w-full">
            <pre className="text-sm overflow-x-auto">
              <code>{`<button className="${currentButton.className}">\n  {children}\n</button>`}</code>
            </pre>
          </div>
        </div>
      </div>
      <div className="flex mt-6 space-x-2">
        {buttons.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-blue-500 scale-125' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ButtonShowcaseCarousel;
