import React, { useState } from 'react';
import { motion } from 'framer-motion';

const options = [
  {
    label: 'Solar System',
    value: 'solar-system',
    children: [
      { label: 'Mercury', value: 'mercury' },
      { label: 'Venus', value: 'venus' },
      { label: 'Earth', value: 'earth', children: [
        { label: 'Moon', value: 'moon' },
        { label: 'ISS', value: 'iss' },
      ]},
      { label: 'Mars', value: 'mars' },
      { label: 'Jupiter', value: 'jupiter' },
      { label: 'Saturn', value: 'saturn' },
      { label: 'Uranus', value: 'uranus' },
      { label: 'Neptune', value: 'neptune' },
    ],
  },
  {
    label: 'Galaxies',
    value: 'galaxies',
    children: [
      { label: 'Milky Way', value: 'milky-way' },
      { label: 'Andromeda', value: 'andromeda' },
      { label: 'Triangulum', value: 'triangulum' },
    ],
  },
  {
    label: 'Nebulae',
    value: 'nebulae',
    children: [
      { label: 'Orion Nebula', value: 'orion' },
      { label: 'Crab Nebula', value: 'crab' },
      { label: 'Eagle Nebula', value: 'eagle' },
    ],
  },
];

const CascaderOption = ({ option, level, onSelect, isSelected }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (option.children) {
      setIsOpen(!isOpen);
    } else {
      onSelect(option);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: level * 0.1 }}
      className="ml-4"
    >
      <div
        className={`cursor-pointer hover:bg-indigo-100 p-2 rounded-md transition-colors duration-200 flex items-center ${isSelected ? 'bg-indigo-200' : ''}`}
        onClick={handleClick}
      >
        <span className="mr-2">{option.children ? '🚀' : '🌟'}</span>
        {option.label}
        {!option.children && (
          <span className="ml-auto">
            {isSelected ? '✅' : '⭕'}
          </span>
        )}
      </div>
      {isOpen && option.children && (
        <div className="ml-4 border-l-2 border-indigo-200">
          {option.children.map((child) => (
            <CascaderOption
              key={child.value}
              option={child}
              level={level + 1}
              onSelect={onSelect}
              isSelected={isSelected}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

const Cascader = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = (option) => {
    let newSelectedOptions;
    if (selectedOptions.some(opt => opt.value === option.value)) {
      newSelectedOptions = selectedOptions.filter(opt => opt.value !== option.value);
    } else {
      newSelectedOptions = [...selectedOptions, option];
    }
    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions.map((opt) => opt.value));
  };

  return (
    <div className="relative w-full">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="border-2 border-indigo-300 rounded-lg p-3 cursor-pointer bg-gradient-to-r from-indigo-100 to-purple-100 shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOptions.length > 0
          ? (
            <div className="flex flex-wrap -m-1">
              {selectedOptions.map((opt) => (
                <span key={opt.value} className="m-1 bg-indigo-200 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {opt.label}
                </span>
              ))}
            </div>
          )
          : 'Embark on Your Cosmic Journey'}
      </motion.div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute z-10 w-full mt-2 bg-white border-2 border-indigo-300 rounded-lg shadow-xl overflow-hidden max-h-96 overflow-y-auto"
        >
          {options.map((option) => (
            <CascaderOption
              key={option.value}
              option={option}
              level={0}
              onSelect={handleSelect}
              isSelected={selectedOptions.some(opt => opt.value === option.value)}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

const App = () => {
  const handleChange = (value) => {
    console.log('Explored:', value);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Cosmic Explorer</h1>
        <Cascader options={options} onChange={handleChange} />
        <p className="mt-4 text-sm text-indigo-600 text-center">Discover multiple wonders of the universe!</p>
      </div>
    </div>
  );
};

export default App;
