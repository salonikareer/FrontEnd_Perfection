import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FuturisticCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setMousePosition({ x, y });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <motion.div
        className="relative w-80 h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl overflow-hidden cursor-pointer"
        animate={{
          rotateY: mousePosition.x * 20 - 10,
          rotateX: -(mousePosition.y * 20 - 10),
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onMouseMove={handleMouseMove}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Nexus-7</h2>
            <p className="text-blue-200">Advanced AI Interface</p>
          </div>
          <motion.div
            className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-lg p-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          >
            <p className="text-white text-sm">
              Access granted. Welcome to the future of human-AI interaction.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-600 to-transparent" />
        <motion.div
          className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white bg-opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default FuturisticCard;
