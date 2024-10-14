import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import { Slider } from "@/components/ui/slider"

const MeatballsMenu = ({ options = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200"
      >
        <div className="flex space-x-1">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10">
          {options.map((option, index) => (
            <button
              key={index}
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
              onClick={() => {
                option.onClick();
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const MusicVisualizer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(60);
  const [isMuted, setIsMuted] = useState(false);
  const [visualizerType, setVisualizerType] = useState('particles');
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const tracks = [
    { id: 1, name: "Neon Lights", artist: "Cyber Synth" },
    { id: 2, name: "Cyber Punk", artist: "Digital Dreams" },
    { id: 3, name: "Retro Wave", artist: "Nostalgia Beats" },
  ];

  const menuOptions = [
    ...tracks.map(track => ({
      label: track.name,
      onClick: () => setCurrentTrack(track.id - 1)
    })),
    {
      label: visualizerType === 'particles' ? 'Switch to Waveform' : 'Switch to Particles',
      onClick: () => setVisualizerType(prev => prev === 'particles' ? 'waveform' : 'particles')
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount = 200;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 4 + 1,
          color: `hsl(${Math.random() * 360}, 70%, 60%)`,
          velocity: { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 }
        });
      }
    };

    const drawWaveform = (time) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      for (let i = 0; i < canvas.width; i++) {
        const y = Math.sin(i * 0.01 + time * 0.1) * 50 + canvas.height / 2;
        ctx.lineTo(i, y);
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (visualizerType === 'particles') {
        particles.forEach(particle => {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();

          particle.x += particle.velocity.x;
          particle.y += particle.velocity.y;

          if (particle.x < 0 || particle.x > canvas.width) particle.velocity.x *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.velocity.y *= -1;

          if (isPlaying) {
            particle.radius = particle.radius < 10 ? particle.radius + 0.05 : 10;
          } else {
            particle.radius = particle.radius > 1 ? particle.radius - 0.05 : 1;
          }
        });
      } else {
        drawWaveform(time);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate(0);

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, visualizerType]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack(prev => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrack(prev => (prev - 1 + tracks.length) % tracks.length);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[500px] bg-gradient-to-br from-gray-900 to-indigo-900 rounded-lg shadow-xl overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Music Visualizer</h2>
          <MeatballsMenu options={menuOptions} />
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-2">{tracks[currentTrack].name}</h3>
          <p className="text-gray-300">{tracks[currentTrack].artist}</p>
          <p className="text-gray-400 mt-2">Track {currentTrack + 1} of {tracks.length}</p>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-center items-center space-x-6">
            <button className="text-white hover:text-gray-300 transition-colors" onClick={prevTrack}>
              <SkipBack size={28} />
            </button>
            <button 
              className="w-20 h-20 rounded-full bg-white text-gray-900 flex items-center justify-center hover:bg-gray-200 transition-colors"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={36} /> : <Play size={36} />}
            </button>
            <button className="text-white hover:text-gray-300 transition-colors" onClick={nextTrack}>
              <SkipForward size={28} />
            </button>
          </div>
          <div className="flex items-center space-x-4 text-white">
            <button onClick={toggleMute}>
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              className="w-full"
              onValueChange={(value) => {
                setVolume(value[0]);
                setIsMuted(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicVisualizer;
