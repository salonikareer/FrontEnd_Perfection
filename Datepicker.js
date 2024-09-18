import React, { useState, useEffect } from 'react';

const DatePicker = () => {
  const [date, setDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [animation, setAnimation] = useState('');

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const [displayMonth, setDisplayMonth] = useState(currentMonth);
  const [displayYear, setDisplayYear] = useState(currentYear);

  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(displayYear, displayMonth, 1).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    if (showCalendar) {
      setAnimation('animate-fade-in');
    } else {
      setAnimation('animate-fade-out');
    }
  }, [showCalendar]);

  const handleDateClick = (day) => {
    const selectedDate = new Date(displayYear, displayMonth, day);
    setDate(selectedDate.toLocaleDateString());
    setShowCalendar(false);
  };

  const handlePrevMonth = () => {
    setAnimation('animate-slide-right');
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else {
      setDisplayMonth(displayMonth - 1);
    }
  };

  const handleNextMonth = () => {
    setAnimation('animate-slide-left');
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else {
      setDisplayMonth(displayMonth + 1);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
      <div className="relative font-sans">
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg px-6 py-3 inline-flex items-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="font-semibold">{date || 'Select a Date'}</span>
        </button>
        
        {showCalendar && (
          <div className={`absolute mt-4 bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${animation}`} 
               style={{
                 left: '50%', 
                 transform: 'translateX(-50%)',
                 width: '320px', // Fixed width
                 maxWidth: '90vw' // Responsive max-width
               }}>
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 flex justify-between items-center">
              <button onClick={handlePrevMonth} className="text-white hover:text-gray-200 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="text-xl font-bold">{monthNames[displayMonth]} {displayYear}</div>
              <button onClick={handleNextMonth} className="text-white hover:text-gray-200 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                  <div key={day} className="text-center text-gray-500 font-medium">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {[...Array(firstDayOfMonth).keys()].map((_, index) => (
                  <div key={`empty-${index}`} />
                ))}
                {[...Array(daysInMonth).keys()].map((day) => {
                  const isToday = new Date().toDateString() === new Date(displayYear, displayMonth, day + 1).toDateString();
                  return (
                    <button
                      key={day + 1}
                      onClick={() => handleDateClick(day + 1)}
                      className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
                        isToday
                          ? 'bg-purple-500 text-white font-bold'
                          : 'hover:bg-indigo-100 text-gray-700'
                      }`}
                    >
                      {day + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePicker;