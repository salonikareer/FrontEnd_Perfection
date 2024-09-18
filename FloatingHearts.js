import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Heart, Flower,  Gift, Sparkles, Music, Palette } from 'lucide-react';

const CustomizableBirthdayCelebration = () => {
  const [items, setItems] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [poppedItems, setPoppedItems] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const [name, setName] = useState('');
  const [theme, setTheme] = useState('default');
  const [playingMusic, setPlayingMusic] = useState(false);
  
  const audioRef = useRef(null); // To reference the audio element

  const themes = {
    default: 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500',
    ocean: 'bg-gradient-to-br from-blue-400 via-teal-500 to-green-500',
    sunset: 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500',
    galaxy: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900',
    forest: 'bg-gradient-to-br from-green-700 via-green-500 to-lime-500'
  };

  const addItem = useCallback(() => {
    setItems(prevItems => [
      ...prevItems,
      {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        top: Math.random() * 100,
        type: ['heart', 'flower', 'balloon', 'gift', 'custom'][Math.floor(Math.random() * 5)],
        size: Math.random() * 20 + 20,
        color: ['text-red-500', 'text-yellow-400', 'text-blue-500', 'text-green-500', 'text-purple-500'][Math.floor(Math.random() * 5)]
      }
    ]);
  }, []);

  const addConfetti = useCallback(() => {
    setConfetti(prev => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        color: ['bg-red-500', 'bg-yellow-400', 'bg-blue-500', 'bg-green-500', 'bg-purple-500'][Math.floor(Math.random() * 5)]
      }
    ]);
  }, []);

  const handleStart = () => {
    setShowMessage(true);
    for (let i = 0; i < 100; i++) {
      setTimeout(addConfetti, i * 20);
    }
  };

  const handleItemClick = (id, left, top) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    setPoppedItems(prev => [...prev, { id, left, top }]);
    setTimeout(() => {
      setPoppedItems(prev => prev.filter(item => item.id !== id));
    }, 1000);
  };

  const toggleMusic = () => {
    setPlayingMusic(!playingMusic);
    if (audioRef.current) {
      if (!playingMusic) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  

  useEffect(() => {
    if (showMessage) {
      const itemInterval = setInterval(() => {
        for (let i = 0; i < 3; i++) {
          addItem();
        }
      }, 500);

      const cleanupInterval = setInterval(() => {
        setItems(prevItems => prevItems.filter(item => Date.now() - item.id < 5000));
        setConfetti(prev => prev.filter(item => Date.now() - item.id < 3000));
      }, 1000);

      return () => {
        clearInterval(itemInterval);
        clearInterval(cleanupInterval);
      };
    }
  }, [showMessage, addItem, addConfetti]);

  const renderItem = (item) => {
    switch(item.type) {
      case 'heart':
        return <Heart className={`${item.color} animate-pulse`} style={{ width: item.size, height: item.size }} />;
      case 'flower':
        return <Flower className={`${item.color} animate-pulse`} style={{ width: item.size, height: item.size }} />;
      case 'balloon':
        return (
          <div className="relative" style={{ width: item.size, height: item.size * 1.2 }}>
            <div className={`absolute w-full h-5/6 rounded-full ${item.color.replace('text-', 'bg-')}`}></div>
            <div className="absolute bottom-0 left-1/2 w-0.5 h-1/6 bg-gray-400 transform -translate-x-1/2"></div>
          </div>
        );
      case 'gift':
        return <Gift className={`${item.color} animate-pulse`} style={{ width: item.size, height: item.size }} />;
      case 'custom':
        return <div className={`${item.color} font-bold`} style={{ fontSize: item.size / 2 }}>{name[0]}</div>;
      default:
        return null;
    }
  };

  return (
    <div className={`relative h-screen ${themes[theme]} flex flex-col justify-center items-center overflow-hidden`}>
      <audio ref={audioRef} src="/birthdaysong.mp3" loop></audio> {/* Reference to the audio file */}
      
      {!showMessage ? (
        <div className="bg-white p-6 rounded-lg shadow-xl z-10">
          <input 
            type="text" 
            placeholder="Enter your name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="mb-4 p-2 border rounded"
          />
          <select 
            value={theme} 
            onChange={(e) => setTheme(e.target.value)} 
            className="mb-4 p-2 border rounded"
          >
            <option value="default">Default Theme</option>
            <option value="ocean">Ocean Theme</option>
            <option value="sunset">Sunset Theme</option>
            <option value="galaxy">Galaxy Theme</option>
            <option value="forest">Forest Theme</option>
          </select>
          <button 
            onClick={handleStart} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Start Celebration
          </button>
        </div>
      ) : (
        <div className="relative z-10 text-center">
          <div className="text-6xl font-bold text-white animate-bounce mb-4">
            Happy Birthday, {name}!
          </div>
          <img src='./birthday-cakes.png' alt="birthday" size={100} className='mx-auto'/>
          {/* <Cake className="text-yellow-300 mx-auto mb-4" size={100} /> */}
          <div className="flex justify-center space-x-4">
            <button onClick={toggleMusic} className="bg-blue-500 text-white p-2 rounded-full">
              <Music size={24} />
            </button>
            {/* <button onClick={toggleCameraMode} className="bg-green-500 text-white p-2 rounded-full">
              <Camera size={24} />
            </button> */}
            <button onClick={() => setTheme(prev => {
              const themes = ['default', 'ocean', 'sunset', 'galaxy', 'forest'];
              const currentIndex = themes.indexOf(prev);
              return themes[(currentIndex + 1) % themes.length];
            })} className="bg-purple-500 text-white p-2 rounded-full">
              <Palette size={24} />
            </button>
          </div>
        </div>
      )}

      {items.map((item) => (
        <div
          key={item.id}
          className="absolute animate-float cursor-pointer"
          style={{ 
            left: `${item.left}%`, 
            top: `${item.top}%`,
            animationDuration: `${Math.random() * 2 + 3}s`
          }}
          onClick={() => handleItemClick(item.id, item.left, item.top)}
        >
          {renderItem(item)}
        </div>
      ))}

      {poppedItems.map((item) => (
        <div
          key={item.id}
          className="absolute animate-pop"
          style={{ 
            left: `${item.left}%`, 
            top: `${item.top}%`,
          }}
        >
          <Sparkles className="text-yellow-300" size={24} />
        </div>
      ))}

      {confetti.map((item) => (
        <div
          key={item.id}
          className={`absolute w-2 h-2 animate-confetti ${item.color}`}
          style={{ 
            left: `${item.left}%`,
            top: '-5%'
          }}
        />
      ))}

      

      {playingMusic && (
        <div className="absolute bottom-4 right-4 bg-white p-2 rounded">
          <p>🎵 Playing birthday music</p>
        </div>
      )}

      <style jsx>{`
        .animate-float {
          animation: floatUp 5s ease-out;
        }
        @keyframes floatUp {
          0% { transform: translateY(100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
        .animate-pop {
          animation: pop 1s ease-out;
        }
        @keyframes pop {
          0% { transform: scale(0.5); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(2); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti 3s ease-out;
        }
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(720deg); }
        }
      `}</style>
    </div>
  );
};

export default CustomizableBirthdayCelebration;
