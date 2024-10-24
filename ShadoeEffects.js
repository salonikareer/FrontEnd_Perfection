import React, { useState, useEffect } from 'react';

const UniqueShadowPlayground = () => {
  const [selectedEffect, setSelectedEffect] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setRotationDegree(prev => (prev + 1) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handleMouseMove = (e, boxId) => {
    if (selectedEffect === boxId) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    }
  };

  const shadowEffects = [
    {
      id: 'neon-pulse',
      name: 'Neon Pulse',
      getStyle: (active, pos) => ({
        background: 'linear-gradient(135deg, #ff4dff 0%, #4d4dff 100%)',
        transform: active ? 'scale(1.05)' : 'scale(1)',
        boxShadow: active ? `
          0 0 20px #ff4dff,
          0 0 40px #4d4dff,
          0 0 60px rgba(77, 77, 255, 0.5)
        ` : 'none',
        animation: active ? 'pulse 1.5s infinite' : 'none'
      })
    },
    {
      id: 'liquid-morph',
      name: 'Liquid Morph',
      getStyle: (active, pos) => ({
        background: 'linear-gradient(45deg, #00f2fe 0%, #4facfe 100%)',
        borderRadius: active ? '60% 40% 30% 70% / 60% 30% 70% 40%' : '20px',
        transform: active ? 'scale(1.1)' : 'scale(1)',
        boxShadow: active ? '0 0 30px rgba(79, 172, 254, 0.6)' : 'none',
        transition: 'all 0.5s ease-in-out'
      })
    },
    {
      id: 'dynamic-light',
      name: 'Dynamic Light',
      getStyle: (active, pos) => ({
        background: 'linear-gradient(180deg, #FF6B6B 0%, #FFE66D 100%)',
        transform: active ? 'translateZ(50px)' : 'translateZ(0)',
        boxShadow: active ? `
          ${pos.x - 75}px ${pos.y - 75}px 20px rgba(255, 107, 107, 0.4),
          ${-pos.x + 75}px ${-pos.y + 75}px 20px rgba(255, 230, 109, 0.4)
        ` : 'none'
      })
    },
    {
      id: 'rainbow-orbit',
      name: 'Rainbow Orbit',
      getStyle: (active) => ({
        background: 'linear-gradient(45deg, #845EC2, #FF6F91)',
        transform: active ? 'scale(1.1)' : 'scale(1)',
        boxShadow: active ? `
          ${Math.cos(rotationDegree * Math.PI / 180) * 20}px 
          ${Math.sin(rotationDegree * Math.PI / 180) * 20}px 
          20px rgba(132, 94, 194, 0.6),
          ${-Math.cos(rotationDegree * Math.PI / 180) * 20}px 
          ${-Math.sin(rotationDegree * Math.PI / 180) * 20}px 
          20px rgba(255, 111, 145, 0.6)
        ` : 'none'
      })
    },
    {
      id: 'geometric-layers',
      name: 'Geometric Layers',
      getStyle: (active) => ({
        background: 'linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)',
        transform: active ? 'rotate(45deg) scale(1.1)' : 'rotate(0deg) scale(1)',
        boxShadow: active ? `
          10px 10px 0 0 rgba(0, 201, 255, 0.4),
          20px 20px 0 0 rgba(146, 254, 157, 0.3),
          30px 30px 0 0 rgba(0, 201, 255, 0.2)
        ` : 'none'
      })
    },
    {
      id: 'glitch-effect',
      name: 'Glitch Effect',
      getStyle: (active) => ({
        background: 'linear-gradient(45deg, #FF61D2 0%, #FE9090 100%)',
        transform: active ? `
          translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)
          scale(1.05)
        ` : 'translate(0, 0) scale(1)',
        boxShadow: active ? `
          ${Math.random() * 8 - 4}px ${Math.random() * 8 - 4}px 0 rgba(255, 97, 210, 0.7),
          ${Math.random() * 8 - 4}px ${Math.random() * 8 - 4}px 0 rgba(254, 144, 144, 0.7)
        ` : 'none'
      })
    }
  ];

  return (
    <div className="w-full max-w-5xl p-8 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Shadow Effect Laboratory
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {shadowEffects.map((effect) => (
          <div
            key={effect.id}
            className="relative"
            onMouseEnter={() => {
              setSelectedEffect(effect.id);
              setIsPlaying(true);
            }}
            onMouseLeave={() => {
              setSelectedEffect(null);
              setIsPlaying(false);
            }}
            onMouseMove={(e) => handleMouseMove(e, effect.id)}
          >
            <div
              className="h-48 w-full rounded-lg transition-all duration-300 cursor-pointer"
              style={effect.getStyle(
                selectedEffect === effect.id,
                mousePos
              )}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-medium text-white text-shadow">
                  {effect.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Interactive Features:</h2>
        <ul className="space-y-3">
          <li className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span>Hover over effects to activate them</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-pink-500"></div>
            <span>Mouse position affects Dynamic Light shadow direction</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Rainbow Orbit creates continuous shadow movement</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Glitch Effect generates random shadow positions</span>
          </li>
        </ul>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1.05); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1.05); }
        }
        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default UniqueShadowPlayground;
