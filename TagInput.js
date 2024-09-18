import React, { useState } from 'react';
import { X } from 'lucide-react';

const TagInput = () => {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      e.preventDefault();
      setTags([...tags, input.trim()]);
      setInput('');
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full flex items-center"
          >
            {tag}
            <button
              onClick={() => removeTag(index)}
              className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Type and press Enter to add tags"
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default TagInput;