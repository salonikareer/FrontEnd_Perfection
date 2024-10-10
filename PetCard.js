import React, { useState, useEffect, useCallback } from 'react';

const InteractivePetCard = () => {
  const [mood, setMood] = useState('content');
  const [energy, setEnergy] = useState(70);
  const [hunger, setHunger] = useState(30);
  const [hydration, setHydration] = useState(70);
  const [love, setLove] = useState(50);
  const [showDetails, setShowDetails] = useState(false);
  const [lastFed, setLastFed] = useState(Date.now());
  const [lastHydrated, setLastHydrated] = useState(Date.now());
  const [activity, setActivity] = useState('');

  const updatePetState = useCallback(() => {
    const now = Date.now();
    const hoursSinceLastFed = (now - lastFed) / (1000 * 60 * 60);
    const hoursSinceLastHydrated = (now - lastHydrated) / (1000 * 60 * 60);

    setHunger(prev => Math.min(100, prev + hoursSinceLastFed * 5));
    setHydration(prev => Math.max(0, prev - hoursSinceLastHydrated * 3));
    setEnergy(prev => Math.max(0, prev - 1));
    setLove(prev => Math.max(0, prev - 0.5));

    updateMood();
  }, [lastFed, lastHydrated]);

  useEffect(() => {
    const timer = setInterval(updatePetState, 5000); // Update every 5 seconds
    return () => clearInterval(timer);
  }, [updatePetState]);

  const updateMood = () => {
    if (hunger > 70 || hydration < 30) {
      setMood('distressed');
    } else if (energy < 30) {
      setMood('tired');
    } else if (love > 80 && hunger < 50 && hydration > 50) {
      setMood('happy');
    } else {
      setMood('content');
    }
  };

  const handlePet = () => {
    setLove(prev => Math.min(100, prev + 10));
    setEnergy(prev => Math.min(100, prev + 5));
    setActivity('You petted Buddy. He looks happier!');
  };

  const handleFeed = () => {
    if (Date.now() - lastFed < 1000 * 60 * 60 * 4) { // 4 hours
      setActivity("Buddy's not hungry yet. It's best not to overfeed.");
      return;
    }
    setHunger(prev => Math.max(0, prev - 30));
    setEnergy(prev => Math.min(100, prev + 10));
    setLastFed(Date.now());
    setActivity('You fed Buddy. He looks satisfied!');
  };

  const handleHydrate = () => {
    if (Date.now() - lastHydrated < 1000 * 60 * 60 * 2) { // 2 hours
      setActivity("Buddy's not thirsty right now. Overhydration can be harmful.");
      return;
    }
    setHydration(prev => Math.min(100, prev + 30));
    setLastHydrated(Date.now());
    setActivity('You gave Buddy water. He looks refreshed!');
  };

  const handlePlay = () => {
    if (energy < 30) {
      setActivity("Buddy's too tired to play right now. Let him rest a bit.");
      return;
    }
    setEnergy(prev => Math.max(0, prev - 20));
    setLove(prev => Math.min(100, prev + 15));
    setHunger(prev => Math.min(100, prev + 10));
    setHydration(prev => Math.max(0, prev - 10));
    setActivity('You played with Buddy. He had a great time!');
  };

  const getMoodEmoji = () => {
    switch (mood) {
      case 'happy': return '😃';
      case 'content': return '😊';
      case 'tired': return '😴';
      case 'distressed': return '😟';
      default: return '😊';
    }
  };

  const renderProgressBar = (value, color) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className={`bg-${color}-600 h-2.5 rounded-full`} style={{width: `${value}%`}}></div>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="relative h-64">
          <img 
            src="./pet-love.png" 
            alt="Cute dog named Buddy" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-white rounded-full p-2 shadow-md">
            <span className="text-2xl" title={`Buddy is ${mood}`}>{getMoodEmoji()}</span>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Meet Buddy</h2>
          <p className="text-gray-600 mb-4">Friendly 3-year-old Golden Retriever seeking a loving home!</p>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold">Energy</span>
              {renderProgressBar(energy, 'blue')}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold">Hunger</span>
              {renderProgressBar(100 - hunger, 'green')}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold">Hydration</span>
              {renderProgressBar(hydration, 'blue')}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold">Love</span>
              {renderProgressBar(love, 'pink')}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button 
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full transition duration-300"
              onClick={handlePet}
            >
              🐾 Pet
            </button>
            <button 
              className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full transition duration-300"
              onClick={handleFeed}
            >
              🍖 Feed
            </button>
            <button 
              className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition duration-300"
              onClick={handleHydrate}
            >
              💧 Water
            </button>
            <button 
              className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-full transition duration-300"
              onClick={handlePlay}
            >
              🎾 Play
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4">{activity}</p>
          <button 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
        {showDetails && (
          <div className="px-6 pb-6 pt-2 bg-blue-50">
            <h3 className="font-bold text-lg mb-2">About Buddy</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Breed: Golden Retriever</li>
              <li>Age: 3 years</li>
              <li>Weight: 65 lbs</li>
              <li>Vaccinated: Yes</li>
              <li>Neutered: Yes</li>
              <li>Good with kids: Yes</li>
              <li>Good with other pets: Yes</li>
            </ul>
            <h3 className="font-bold text-lg mt-4 mb-2">Care Tips</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Feed adult dogs 2-3 times daily</li>
              <li>Ensure fresh water is always available</li>
              <li>Regular exercise is crucial for physical and mental health</li>
              <li>Grooming helps bonding and maintains coat health</li>
              <li>Regular vet check-ups are important for preventive care</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractivePetCard;