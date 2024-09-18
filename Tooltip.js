import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InteractiveTooltip = () => {
  const [activeTooltip, setActiveTooltip] = useState(null);

  const tooltips = [
    { id: 'top', text: 'Explore', position: 'top', icon: '🔍' },
    { id: 'right', text: 'Share', position: 'right', icon: '🔗' },
    { id: 'bottom', text: 'Download', position: 'bottom', icon: '⬇️' },
    { id: 'left', text: 'Favorite', position: 'left', icon: '⭐' },
  ];

  const getTooltipClasses = (position) => {
    const baseClasses = 'absolute bg-white text-gray-800 text-sm rounded-lg shadow-lg p-3 border-2 border-indigo-500 z-10';
    switch (position) {
      case 'top': return `${baseClasses} bottom-full left-1/2 -translate-x-1/2 mb-2`;
      case 'right': return `${baseClasses} left-full top-1/2 -translate-y-1/2 ml-2`;
      case 'bottom': return `${baseClasses} top-full left-1/2 -translate-x-1/2 mt-2`;
      case 'left': return `${baseClasses} right-full top-1/2 -translate-y-1/2 mr-2`;
      default: return baseClasses;
    }
  };

  const getArrowClasses = (position) => {
    const baseClasses = 'absolute border-8 border-transparent';
    switch (position) {
      case 'top': return `${baseClasses} top-full left-1/2 -translate-x-1/2 border-t-indigo-500`;
      case 'right': return `${baseClasses} right-full top-1/2 -translate-y-1/2 border-r-indigo-500`;
      case 'bottom': return `${baseClasses} bottom-full left-1/2 -translate-x-1/2 border-b-indigo-500`;
      case 'left': return `${baseClasses} left-full top-1/2 -translate-y-1/2 border-l-indigo-500`;
      default: return baseClasses;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="grid grid-cols-2 gap-8">
        {tooltips.map((tooltip) => (
          <motion.button
            key={tooltip.id}
            onMouseEnter={() => setActiveTooltip(tooltip.id)}
            onMouseLeave={() => setActiveTooltip(null)}
            className="px-6 py-3 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 relative text-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2">{tooltip.icon}</span>
            {tooltip.text}
            {activeTooltip === tooltip.id && (
              <motion.div
                className={getTooltipClasses(tooltip.position)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <p className="whitespace-nowrap font-semibold">
                  {`${tooltip.text} feature activated!`}
                </p>
                <div className={getArrowClasses(tooltip.position)}></div>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default InteractiveTooltip;