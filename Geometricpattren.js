import React, { useState, useEffect } from 'react';

const GeometricPattern = () => {
  const [hue, setHue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHue((prevHue) => (prevHue + 1) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 transition-colors duration-1000 ease-in-out"
        style={{
          '--u': '1px',
          '--c1': `hsl(${hue}, 70%, 90%)`,
          '--c2': `hsl(${(hue + 120) % 360}, 70%, 10%)`,
          '--c3': `hsl(${(hue + 240) % 360}, 70%, 20%)`,
          '--gp': '50% / calc(var(--u) * 16.9) calc(var(--u) * 12.8)',
          backgroundImage: `
            conic-gradient(from 122deg at 50% 85.15%, var(--c2) 0 58deg, var(--c3) 0 116deg, #fff0 0 100%),
            conic-gradient(from 122deg at 50% 72.5%, var(--c1) 0 116deg, #fff0 0 100%),
            conic-gradient(from 58deg at 82.85% 50%, var(--c3) 0 64deg, #fff0 0 100%),
            conic-gradient(from 58deg at 66.87% 50%, var(--c1) 0 64deg, var(--c2) 0 130deg, #fff0 0 100%),
            conic-gradient(from 238deg at 17.15% 50%, var(--c2) 0 64deg, #fff0 0 100%),
            conic-gradient(from 172deg at 33.13% 50%, var(--c3) 0 66deg, var(--c1) 0 130deg, #fff0 0 100%),
            linear-gradient(98deg, var(--c3) 0 15%, #fff0 calc(15% + 1px) 100%),
            linear-gradient(-98deg, var(--c2) 0 15%, #fff0 calc(15% + 1px) 100%),
            conic-gradient(from -58deg at 50.25% 14.85%, var(--c3) 0 58deg, var(--c2) 0 116deg, #fff0 0 100%),
            conic-gradient(from -58deg at 50% 28.125%, var(--c1) 0 116deg, #fff0 0 100%),
            linear-gradient(90deg, var(--c2) 0 50%, var(--c3) 0 100%)
          `,
          backgroundSize: 'var(--gp)',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white text-center px-6 py-3 bg-black/30 backdrop-blur-sm rounded-lg shadow-lg animate-bounce">
          Geometric Pattern
        </h1>
      </div>
    </div>
  );
};

export default GeometricPattern;