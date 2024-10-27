import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";

const AnimationShowcase = () => {
  const [isPlaying, setIsPlaying] = useState({
    bounce: true,
    fade: true,
    rotate: true,
    scale: true,
    slide: true,
    shake: true,
    pulse: true,
    wave: true,
  });

  const [animationSpeed, setAnimationSpeed] = useState({
    bounce: 1,
    fade: 1,
    rotate: 1,
    scale: 1,
    slide: 1,
    shake: 1,
    pulse: 1,
    wave: 1,
  });

  const [timingFunction, setTimingFunction] = useState({
    bounce: 'ease',
    fade: 'linear',
    rotate: 'ease-in-out',
    scale: 'ease-out',
    slide: 'ease-in',
    shake: 'linear',
    pulse: 'ease-in-out',
    wave: 'ease-in-out',
  });

  // CSS for custom animations
  const styles = `
    @keyframes fadeInOut {
      0% { opacity: 0; }
      50% { opacity: 1; }
      100% { opacity: 0; }
    }

    @keyframes scaleAnimation {
      0% { transform: scale(1); }
      50% { transform: scale(1.75); }
      100% { transform: scale(1); }
    }

    @keyframes slideAnimation {
      0% { transform: translateX(-150%); }
      50% { transform: translateX(0); }
      100% { transform: translateX(150%); }
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      75% { transform: translateX(10px); }
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.3); opacity: 0.8; }
    }

    @keyframes wave {
      0% { transform: skewX(-15deg); }
      25% { transform: skewX(15deg); }
      50% { transform: skewX(-15deg); }
      75% { transform: skewX(15deg); }
      100% { transform: skewX(-15deg); }
    }

    .animate-fade {
      animation: fadeInOut infinite;
    }

    .animate-scale-custom {
      animation: scaleAnimation infinite;
    }

    .animate-slide-custom {
      animation: slideAnimation infinite;
    }

    .animate-shake {
      animation: shake infinite;
    }

    .animate-pulse-custom {
      animation: pulse infinite;
    }

    .animate-wave {
      animation: wave infinite;
    }

    .animation-container {
      width: 100%;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.03);
      border-radius: 8px;
    }
  `;

  const toggleAnimation = (key) => {
    setIsPlaying(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const updateSpeed = (key, value) => {
    setAnimationSpeed(prev => ({
      ...prev,
      [key]: value[0]
    }));
  };

  const AnimationCard = ({ title, color, type, children }) => (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex gap-2">
          <select
            className="px-2 py-1 border rounded"
            value={timingFunction[type]}
            onChange={(e) => setTimingFunction(prev => ({
              ...prev,
              [type]: e.target.value
            }))}
          >
            <option value="linear">Linear</option>
            <option value="ease">Ease</option>
            <option value="ease-in">Ease In</option>
            <option value="ease-out">Ease Out</option>
            <option value="ease-in-out">Ease In Out</option>
          </select>
          <button 
            onClick={() => toggleAnimation(type)}
            className={`px-4 py-2 text-white rounded hover:opacity-90 ${color}`}
          >
            {isPlaying[type] ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Speed: {animationSpeed[type].toFixed(1)}x
        </label>
        <Slider
          value={[animationSpeed[type]]}
          max={2}
          min={0.1}
          step={0.1}
          onValueChange={(value) => updateSpeed(type, value)}
        />
      </div>
      <div className="animation-container">
        {children}
      </div>
    </div>
  );

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <style>{styles}</style>
      <h1 className="text-3xl font-bold text-center mb-8">CSS Animation Showcase</h1>

      {/* Fade Animation - Improved */}
      <AnimationCard title="Fade Animation" color="bg-purple-500" type="fade">
        <div 
          className={`w-20 h-20 bg-purple-500 rounded-lg ${
            isPlaying.fade ? 'animate-fade' : ''
          }`}
          style={{
            animationDuration: `${2 / animationSpeed.fade}s`,
            animationTimingFunction: timingFunction.fade,
            opacity: isPlaying.fade ? undefined : 1
          }}
        />
      </AnimationCard>

      {/* Scale Animation - Improved */}
      <AnimationCard title="Scale Animation" color="bg-red-500" type="scale">
        <div 
          className={`w-20 h-20 bg-red-500 rounded-lg ${
            isPlaying.scale ? 'animate-scale-custom' : ''
          }`}
          style={{
            animationDuration: `${2 / animationSpeed.scale}s`,
            animationTimingFunction: timingFunction.scale
          }}
        />
      </AnimationCard>

      {/* Slide Animation - Improved */}
      <AnimationCard title="Slide Animation" color="bg-yellow-500" type="slide">
        <div 
          className={`w-20 h-20 bg-yellow-500 rounded-lg ${
            isPlaying.slide ? 'animate-slide-custom' : ''
          }`}
          style={{
            animationDuration: `${3 / animationSpeed.slide}s`,
            animationTimingFunction: timingFunction.slide
          }}
        />
      </AnimationCard>

      {/* Bounce Animation */}
      <AnimationCard title="Bounce Animation" color="bg-blue-500" type="bounce">
        <div 
          className={`w-20 h-20 bg-blue-500 rounded-lg ${
            isPlaying.bounce ? 'animate-bounce' : ''
          }`}
          style={{
            animationDuration: `${1 / animationSpeed.bounce}s`,
            animationTimingFunction: timingFunction.bounce
          }}
        />
      </AnimationCard>

      {/* Rotate Animation */}
      <AnimationCard title="Rotate Animation" color="bg-green-500" type="rotate">
        <div 
          className={`w-20 h-20 bg-green-500 rounded-lg ${
            isPlaying.rotate ? 'animate-spin' : ''
          }`}
          style={{
            animationDuration: `${3 / animationSpeed.rotate}s`,
            animationTimingFunction: timingFunction.rotate
          }}
        />
      </AnimationCard>

      {/* Shake Animation */}
      <AnimationCard title="Shake Animation" color="bg-pink-500" type="shake">
        <div 
          className={`w-20 h-20 bg-pink-500 rounded-lg ${
            isPlaying.shake ? 'animate-shake' : ''
          }`}
          style={{
            animationDuration: `${0.5 / animationSpeed.shake}s`,
            animationTimingFunction: timingFunction.shake
          }}
        />
      </AnimationCard>

      {/* Pulse Animation */}
      <AnimationCard title="Pulse Animation" color="bg-indigo-500" type="pulse">
        <div 
          className={`w-20 h-20 bg-indigo-500 rounded-lg ${
            isPlaying.pulse ? 'animate-pulse-custom' : ''
          }`}
          style={{
            animationDuration: `${1.5 / animationSpeed.pulse}s`,
            animationTimingFunction: timingFunction.pulse
          }}
        />
      </AnimationCard>

      {/* Wave Animation */}
      <AnimationCard title="Wave Animation" color="bg-teal-500" type="wave">
        <div 
          className={`w-20 h-20 bg-teal-500 rounded-lg ${
            isPlaying.wave ? 'animate-wave' : ''
          }`}
          style={{
            animationDuration: `${2 / animationSpeed.wave}s`,
            animationTimingFunction: timingFunction.wave
          }}
        />
      </AnimationCard>
    </div>
  );
};

export default AnimationShowcase;
