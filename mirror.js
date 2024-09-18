import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Cloud, Newspaper, Plus, X } from 'lucide-react';

const SmartMirror = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState({ temp: 0, condition: 'Sunny' });
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', time: '' });

  // Load events from local storage on initial render
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    setEvents(storedEvents);
  }, []);

  // Save events to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      // Replace with actual API call
      setWeather({
        temp: Math.floor(Math.random() * 30) + 10,
        condition: ['Sunny', 'Rainy', 'Cloudy', 'Snowy'][Math.floor(Math.random() * 4)]
      });
    };

    const fetchNews = async () => {
      try {
        const response = await fetch('https://content.guardianapis.com/search?api-key=7e389092-6a30-4421-afc2-dd84b1c5d57a');
        const data = await response.json();
        setNews(data.response.results.slice(0, 5).map((article, index) => ({
          id: article.id,
          title: article.webTitle,
          section: article.sectionName
        })));
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchWeather();
    fetchNews();
    const dataInterval = setInterval(() => {
      fetchWeather();
      fetchNews();
    }, 600000); // Update every 10 minutes

    return () => clearInterval(dataInterval);
  }, []);

  const addEvent = (e) => {
    e.preventDefault();
    if (newEvent.title && newEvent.time) {
      setEvents(prevEvents => [...prevEvents, { ...newEvent, id: Date.now() }]);
      setNewEvent({ title: '', time: '' });
    }
  };

  const deleteEvent = (id) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
  };

  return (
    <div className="bg-black text-white h-screen p-8 flex flex-col">
      <div className="text-6xl font-bold mb-4 self-center">
        {time.toLocaleTimeString()}
      </div>

      <div className="flex-1 grid grid-cols-3 gap-8">
        {/* Weather Widget */}
        <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center">
          <Cloud className="w-16 h-16 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Weather</h2>
          <p className="text-4xl mb-2">{weather.temp}°C</p>
          <p className="text-xl">{weather.condition}</p>
        </div>

        {/* Calendar Widget */}
        <div className="bg-gray-800 rounded-lg p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 mr-2" />
              <h2 className="text-2xl font-bold">Today's Events</h2>
            </div>
          </div>
          <ul className="mb-4">
            {events.map(event => (
              <li key={event.id} className="mb-2 flex justify-between items-center">
                <span>
                  <span className="font-bold 2xl">{event.time}</span> - {event.title}
                </span>
                <button onClick={() => deleteEvent(event.id)} className="text-red-500 hover:text-red-700">
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
          <form onSubmit={addEvent} className="flex flex-col">
            <input
              type="text"
              placeholder="Event title"
              value={newEvent.title}
              onChange={(e) => setNewEvent(prev => ({...prev, title: e.target.value}))}
              className="mb-2 p-2 bg-gray-700 rounded"
            />
            <input
              type="time"
              value={newEvent.time}
              onChange={(e) => setNewEvent(prev => ({...prev, time: e.target.value}))}
              className="mb-2 p-2 bg-gray-700 rounded"
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <Plus size={16} className="inline mr-2" />
              Add Event
            </button>
          </form>
        </div>

        {/* News Widget */}
        <div className="bg-gray-800 rounded-lg p-6 overflow-y-auto">
          <div className="flex items-center mb-4">
            <Newspaper className="w-8 h-8 mr-2" />
            <h2 className="text-2xl font-bold">Latest News</h2>
          </div>
          <ul>
            {news.map(item => (
              <li key={item.id} className="mb-2">
                <span className="font-bold">{item.section}</span>: {item.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SmartMirror;