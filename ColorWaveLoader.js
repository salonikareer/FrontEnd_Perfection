import React from 'react';

const ColorWaveLoader = () => {
  const colors = ['#FF9FF3', '#FECA57', '#FF6B6B', '#48DBFB', '#FF9FF3'];

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      <div className="relative">
        <div className="flex space-x-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-8 h-24 rounded-full animate-wave"
              style={{
                backgroundColor: colors[i],
                animationDelay: `${i * 0.1}s`,
                boxShadow: `0 0 20px ${colors[i]}`,
              }}
            ></div>
          ))}
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-20 animate-pulse rounded-full filter blur-xl"></div>
      </div>
      <div className="mt-8 text-4xl font-bold text-white animate-bounce">
        Loading...
      </div>
      <style>{`
        .animate-wave {
          animation: wave 1.5s infinite ease-in-out;
        }
        @keyframes wave {
          0%, 100% {
            transform: scaleY(0.5);
          }
          50% {
            transform: scaleY(1.2);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default ColorWaveLoader;