import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Fetching dummy data from an API
  useEffect(() => {
    const fetchSuggestions = async () => {
      const response = await fetch('https://randomuser.me/api/?results=50');
      const data = await response.json();
      const users = data.results.map(user => `${user.name.first} ${user.name.last}`);
      setSuggestions(users);
    };

    fetchSuggestions();
  }, []);

  const handleInputChange = (e) => {
    const userInput = e.target.value;
    setQuery(userInput);

    // Filter suggestions based on the input
    const filtered = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  return (
    <div className="flex flex-col items-center mt-40 justify-center ">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Search users..."
      />
      {query && filteredSuggestions.length > 0 && (
        <ul className="border border-gray-300 rounded-lg mt-2 w-64 max-h-40 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => setQuery(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
