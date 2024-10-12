import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Heart, Zap, Coffee, Moon, Sun, Droplet, Book, Dumbbell } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AdvancedLifecyclePet = () => {
  const [stage, setStage] = useState(0);
  const [food, setFood] = useState(50);
  const [energy, setEnergy] = useState(50);
  const [happiness, setHappiness] = useState(50);
  const [hydration, setHydration] = useState(50);
  const [intelligence, setIntelligence] = useState(0);
  const [strength, setStrength] = useState(0);
  const [logs, setLogs] = useState([]);
  const [isDaytime, setIsDaytime] = useState(true);
  const [isAlive, setIsAlive] = useState(true);
  const intervalRef = useRef(null);

  const addLog = useCallback((message) => {
    setLogs((prevLogs) => [{ id: Date.now(), message }, ...prevLogs.slice(0, 4)]);
  }, []);

  const updateStats = useCallback(() => {
    if (isAlive) {
      setFood((prev) => Math.max(0, prev - 2));
      setEnergy((prev) => Math.max(0, prev - 2));
      setHappiness((prev) => Math.max(0, prev - 2));
      setHydration((prev) => Math.max(0, prev - 2));
    }
  }, [isAlive]);

  useEffect(() => {
    addLog("🐣 Pet hatched! (Component Mounted)");
    intervalRef.current = setInterval(() => {
      updateStats();
      setIsDaytime((prev) => !prev);
    }, 5000);
    return () => {
      clearInterval(intervalRef.current);
      addLog("👋 Pet said goodbye! (Component Unmounted)");
    };
  }, [addLog, updateStats]);

  useEffect(() => {
    if (food > 80 && energy > 80 && happiness > 80 && hydration > 80) {
      setStage((prev) => {
        if (prev < 3) {
          addLog(`🎉 Pet evolved to stage ${prev + 2}! (State Updated)`);
          return prev + 1;
        }
        return prev;
      });
    }
  }, [food, energy, happiness, hydration, addLog]);

  useEffect(() => {
    if (food === 0 || energy === 0 || happiness === 0 || hydration === 0) {
      setIsAlive(false);
      clearInterval(intervalRef.current);
      addLog("💔 Oh no! Your pet has fainted. (Component Error State)");
    }
  }, [food, energy, happiness, hydration, addLog]);

  const handleAction = (action, stateSetter, amount, icon, messagePart) => {
    if (isAlive) {
      stateSetter((prev) => Math.min(100, prev + amount));
      addLog(`${icon} Pet ${messagePart}! (State Updated)`);
    }
  };

  const handleTrain = (stat, stateSetter, icon, messagePart) => {
    if (isAlive && energy >= 20) {
      stateSetter((prev) => Math.min(100, prev + 10));
      setEnergy((prev) => Math.max(0, prev - 20));
      addLog(`${icon} Pet trained ${messagePart}! (State Updated)`);
    } else {
      addLog("⚠️ Not enough energy to train! (Conditional Rendering)");
    }
  };

  const revivePet = () => {
    setIsAlive(true);
    setFood(50);
    setEnergy(50);
    setHappiness(50);
    setHydration(50);
    addLog("🎊 Pet revived! (State Reset)");
    intervalRef.current = setInterval(updateStats, 5000);
  };

  const petEmojis = ['🥚', '🐣', '🐥', '🐔'];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden m-4 p-6">
      <div className="text-center mb-4">
        <span className="text-6xl">{petEmojis[stage]}</span>
        <h2 className="mt-2 text-2xl font-semibold">Lifecycle Pet (Stage {stage + 1})</h2>
        {isDaytime ? <Sun className="inline-block ml-2 text-yellow-500" /> : <Moon className="inline-block ml-2 text-blue-500" />}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        {[
          { icon: Coffee, color: "yellow-600", stat: food, label: "Food" },
          { icon: Zap, color: "yellow-400", stat: energy, label: "Energy" },
          { icon: Heart, color: "red-500", stat: happiness, label: "Happiness" },
          { icon: Droplet, color: "blue-500", stat: hydration, label: "Hydration" },
          { icon: Book, color: "green-500", stat: intelligence, label: "Intelligence" },
          { icon: Dumbbell, color: "purple-500", stat: strength, label: "Strength" },
        ].map(({ icon: Icon, color, stat, label }) => (
          <div key={label} className="flex items-center">
            <Icon className={`mr-2 text-${color}`} />
            <div className="bg-gray-200 w-full h-4 rounded-full">
              <div className={`bg-${color} h-4 rounded-full`} style={{width: `${stat}%`}}></div>
            </div>
            <span className="ml-2 text-sm">{stat}%</span>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-4">
        <button onClick={() => handleAction("feed", setFood, 20, "🍔", "was fed")} className="bg-yellow-600 text-white px-2 py-1 rounded text-sm">Feed</button>
        <button onClick={() => handleAction("play", setHappiness, 20, "🎾", "played")} className="bg-red-500 text-white px-2 py-1 rounded text-sm">Play</button>
        <button onClick={() => handleAction("sleep", setEnergy, 20, "💤", "slept")} className="bg-blue-500 text-white px-2 py-1 rounded text-sm">Sleep</button>
        <button onClick={() => handleAction("drink", setHydration, 20, "💧", "drank")} className="bg-blue-400 text-white px-2 py-1 rounded text-sm">Drink</button>
        <button onClick={() => handleTrain("intelligence", setIntelligence, "📚", "intelligence")} className="bg-green-500 text-white px-2 py-1 rounded text-sm">Study</button>
        <button onClick={() => handleTrain("strength", setStrength, "💪", "strength")} className="bg-purple-500 text-white px-2 py-1 rounded text-sm">Exercise</button>
      </div>
      
      {!isAlive && (
        <div className="text-center mb-4">
          <button onClick={revivePet} className="bg-green-500 text-white px-4 py-2 rounded">Revive Pet</button>
        </div>
      )}
      
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Lifecycle Logs:</h3>
        <div className="space-y-2">
          {logs.map(({ id, message }) => (
            <Alert key={id}>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedLifecyclePet;
