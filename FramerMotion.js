import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation } from 'framer-motion';

const SpacePortfolio = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const constraintsRef = useRef(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorSize = useMotionValue(20);

  const planets = [
    { id: 'skills', name: 'Skills', color: 'bg-purple-500' },
    { id: 'projects', name: 'Projects', color: 'bg-blue-500' },
    { id: 'experience', name: 'Experience', color: 'bg-green-500' },
    { id: 'contact', name: 'Contact', color: 'bg-red-500' },
  ];

  const skills = ['React', 'JavaScript', 'CSS', 'Node.js', 'Python', 'AWS'];
  const projects = ['Space Portfolio', 'E-commerce Platform', 'AI Chatbot', 'Mobile Game'];

  const astronautControls = useAnimation();

  const floatAstronaut = async () => {
    while (true) {
      await astronautControls.start({
        y: [0, -30, 0],
        x: [0, 15, 0, -15, 0],
        rotate: [0, 10, 0, -10, 0],
        transition: {
          duration: 10,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatType: "reverse"
        }
      });
    }
  };

  React.useEffect(() => {
    floatAstronaut();
  }, []);

  return (
    <motion.div 
      ref={constraintsRef}
      className="min-h-screen bg-black text-white p-8 overflow-hidden relative"
      onMouseMove={(e) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }}
      onMouseEnter={() => cursorSize.set(40)}
      onMouseLeave={() => cursorSize.set(20)}
    >
      {/* Enhanced star background */}
      {[...Array(200)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, Math.random() * 0.5 + 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
      ))}

      {/* Interactive cursor */}
      <motion.div
        className="fixed bg-white rounded-full mix-blend-difference pointer-events-none z-50"
        style={{
          x: cursorX,
          y: cursorY,
          width: cursorSize,
          height: cursorSize,
        }}
      />

      <motion.h1
        className="text-6xl font-bold mb-12 text-center relative z-10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        Frontend_perfection Space Portfolio
      </motion.h1>

      {/* Floating planets */}
      <div className="relative h-[600px]">
        {planets.map((planet, index) => (
          <motion.div
            key={planet.id}
            className={`absolute ${planet.color} rounded-full w-32 h-32 flex items-center justify-center cursor-pointer shadow-lg`}
            style={{
              left: `${25 + index * 20}%`,
              top: `${20 + (index % 2) * 40}%`,
            }}
            whileHover={{ scale: 1.2, boxShadow: "0 0 20px rgba(255,255,255,0.5)" }}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            onClick={() => setSelectedPlanet(planet.id)}
          >
            <span className="font-semibold text-xl">{planet.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Planet content modal */}
      <AnimatePresence>
        {selectedPlanet && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 p-8 rounded-lg max-w-2xl w-full relative overflow-hidden"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <h2 className="text-3xl font-bold mb-4">{selectedPlanet}</h2>
              {selectedPlanet === 'skills' && (
                <motion.div className="grid grid-cols-2 gap-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      className="bg-purple-700 p-3 rounded"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(255,255,255,0.5)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </motion.div>
              )}
              {selectedPlanet === 'projects' && (
                <motion.div className="space-y-4">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project}
                      className="bg-blue-700 p-3 rounded"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(255,255,255,0.5)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {project}
                    </motion.div>
                  ))}
                </motion.div>
              )}
              {selectedPlanet === 'experience' && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  transition={{ duration: 0.5 }}
                  className="bg-green-700 p-4 rounded overflow-hidden"
                >
                  <h3 className="font-bold text-xl mb-2">Software Engineer at SpaceTech</h3>
                  <p>Developed interstellar communication systems and warp drive interfaces.</p>
                </motion.div>
              )}
              {selectedPlanet === 'contact' && (
                <motion.form
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full p-2 rounded bg-gray-800"
                    whileFocus={{ scale: 1.05, boxShadow: "0 0 10px rgba(255,255,255,0.5)" }}
                  />
                  <motion.textarea 
                    placeholder="Your Message" 
                    className="w-full p-2 rounded bg-gray-800" 
                    rows="4"
                    whileFocus={{ scale: 1.05, boxShadow: "0 0 10px rgba(255,255,255,0.5)" }}
                  ></motion.textarea>
                  <motion.button
                    className="bg-red-600 text-white px-4 py-2 rounded"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(255,255,255,0.5)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Message
                  </motion.button>
                </motion.form>
              )}
              <motion.button
                className="mt-6 bg-white text-black px-4 py-2 rounded absolute top-4 right-4"
                whileHover={{ scale: 1.1, boxShadow: "0 0 10px rgba(255,255,255,0.5)" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedPlanet(null)}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Improved floating astronaut */}
      <motion.div
        className="fixed bottom-10 right-10 w-20 h-20 flex items-center justify-center z-10"
        animate={astronautControls}
      >
        <motion.div 
          className="w-full h-full bg-white rounded-full flex items-center justify-center text-4xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          👨‍🚀
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SpacePortfolio;