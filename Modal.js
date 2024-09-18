import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle, AlertTriangle, Loader } from 'lucide-react';

const modalVariants = {
  scaleUp: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 }
  },
  slideDown: {
    hidden: { y: "-100%", opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 }
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }
};

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  type = 'default', 
  animationType = 'scaleUp',
  isLoading = false
}) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const getIconByType = () => {
    switch (type) {
      case 'info': return <AlertCircle className="text-blue-500" size={24} />;
      case 'success': return <CheckCircle className="text-green-500" size={24} />;
      case 'warning': return <AlertTriangle className="text-yellow-500" size={24} />;
      default: return null;
    }
  };

  const getBackgroundColorByType = () => {
    switch (type) {
      case 'info': return 'bg-blue-50';
      case 'success': return 'bg-green-50';
      case 'warning': return 'bg-yellow-50';
      default: return 'bg-white';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        >
          <motion.div
            ref={modalRef}
            variants={modalVariants[animationType]}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`rounded-lg shadow-xl w-full max-w-md ${getBackgroundColorByType()}`}
          >
            <div className="flex justify-between items-center border-b p-4">
              <div className="flex items-center">
                {getIconByType()}
                <h2 className="text-xl font-semibold ml-2">{title}</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <Loader className="animate-spin text-gray-500" size={32} />
                </div>
              ) : (
                children
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ModalExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('default');
  const [animationType, setAnimationType] = useState('scaleUp');
  const [isLoading, setIsLoading] = useState(false);

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
    if (type === 'loading') {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 3000);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black space-y-4">
      <button onClick={() => openModal('default')} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
        Open Default Modal
      </button>
      <button onClick={() => openModal('info')} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
        Open Info Modal
      </button>
      <button onClick={() => openModal('success')} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
        Open Success Modal
      </button>
      <button onClick={() => openModal('warning')} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded">
        Open Warning Modal
      </button>
      <button onClick={() => openModal('loading')} className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded">
        Open Loading Modal
      </button>
      <select 
        onChange={(e) => setAnimationType(e.target.value)} 
        value={animationType}
        className="mt-4 p-2 border rounded"
      >
        <option value="scaleUp">Scale Up</option>
        <option value="slideDown">Slide Down</option>
        <option value="fadeIn">Fade In</option>
      </select>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={`${modalType.charAt(0).toUpperCase() + modalType.slice(1)} Modal`}
        type={modalType}
        animationType={animationType}
        isLoading={isLoading}
      >
        <p className="mb-4">This is an example of a {modalType} modal dialog with {animationType} animation.</p>
        <button
          onClick={closeModal}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
        >
          Close Modal
        </button>
      </Modal>
    </div>
  );
};

export default ModalExample;