import React, { useState, useEffect } from 'react';

const DrawerDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [goal, setGoal] = useState(350);
  const [animate, setAnimate] = useState(false);

  const data = [
    { goal: 400 }, { goal: 300 }, { goal: 200 }, { goal: 300 },
    { goal: 200 }, { goal: 278 }, { goal: 189 }, { goal: 239 },
    { goal: 300 }, { goal: 200 }, { goal: 278 }, { goal: 189 },
    { goal: 349 }
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setAnimate(true), 100);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  const onClick = (adjustment) => {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
    setAnimate(false);
    setTimeout(() => setAnimate(true), 50);
  };

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <div className="relative h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={toggleDrawer}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Open Goal Setter
      </button>

      {isOpen && (
        <div className="fixed inset-0 overflow-hidden z-50">
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              onClick={toggleDrawer}
            ></div>
            <section className={`absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16 transform ${animate ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 ease-in-out`}>
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll rounded-l-2xl">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between mb-8">
                      <h2 className="text-2xl font-bold text-gray-900">Move Goal</h2>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500 transition duration-150 ease-in-out"
                        onClick={toggleDrawer}
                      >
                        <span className="sr-only">Close panel</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <p className="text-lg text-gray-600 mb-6">Set your daily activity goal.</p>
                        <div className="flex items-center justify-center space-x-6 mb-8">
                          <button
                            className={`w-12 h-12 flex items-center justify-center rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-100 transition duration-300 ease-in-out ${goal <= 200 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => onClick(-10)}
                            disabled={goal <= 200}
                          >
                            <span className="sr-only">Decrease</span>
                            <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <div className="text-center">
                            <div className={`text-7xl font-bold tracking-tight text-blue-600 transition-all duration-300 ease-in-out ${animate ? 'scale-110' : 'scale-100'}`}>
                              {goal}
                            </div>
                            <div className="text-xl uppercase text-gray-500 mt-2">Calories/day</div>
                          </div>
                          <button
                            className={`w-12 h-12 flex items-center justify-center rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-100 transition duration-300 ease-in-out ${goal >= 400 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => onClick(10)}
                            disabled={goal >= 400}
                          >
                            <span className="sr-only">Increase</span>
                            <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                        <div className="mt-12 h-48 bg-gray-100 rounded-lg p-4">
                          <div className="h-full flex items-end space-x-1">
                            {data.map((item, index) => (
                              <div
                                key={index}
                                className="w-full bg-blue-500 rounded-t transition-all duration-500 ease-in-out"
                                style={{ 
                                  height: animate ? `${(item.goal / 400) * 100}%` : '0%',
                                  transition: `height 500ms ease-in-out ${index * 50}ms`
                                }}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 px-4 py-4 flex justify-end space-x-2 bg-gray-50">
                    <button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                      onClick={toggleDrawer}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    >
                      Save Goal
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrawerDemo;