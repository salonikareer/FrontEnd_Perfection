import React, { useState } from 'react';
import { Smile, Search } from 'lucide-react';

// Emoji list (simplified for brevity)
const emojiList = [
  { emoji: '😀', name: 'Grinning Face' },
{ emoji: '😍', name: 'Smiling Face with Heart-Eyes' },
{ emoji: '🤔', name: 'Thinking Face' },
{ emoji: '😎', name: 'Smiling Face with Sunglasses' },
{ emoji: '😂', name: 'Face with Tears of Joy' },
{ emoji: '🥳', name: 'Partying Face' },
{ emoji: '😴', name: 'Sleeping Face' },
{ emoji: '🥰', name: 'Smiling Face with Hearts' },
{ emoji: '🤩', name: 'Star-Struck' },
{ emoji: '😇', name: 'Smiling Face with Halo' },
{ emoji: '😁', name: 'Beaming Face with Smiling Eyes' },
{ emoji: '😅', name: 'Grinning Face with Sweat' },
{ emoji: '🥲', name: 'Smiling Face with Tear' },
{ emoji: '😜', name: 'Winking Face with Tongue' },
{ emoji: '🤤', name: 'Drooling Face' },
{ emoji: '🤯', name: 'Exploding Head' },
{ emoji: '🤗', name: 'Hugging Face' },
{ emoji: '😏', name: 'Smirking Face' },
{ emoji: '😬', name: 'Grimacing Face' },
{ emoji: '😱', name: 'Face Screaming in Fear' },
{ emoji: '🤫', name: 'Shushing Face' },
{ emoji: '🤪', name: 'Zany Face' },
{ emoji: '😤', name: 'Face with Steam from Nose' },
{ emoji: '😢', name: 'Crying Face' },
{ emoji: '😈', name: 'Smiling Face with Horns' },
{ emoji: '🥵', name: 'Hot Face' },
{ emoji: '🥶', name: 'Cold Face' },
{ emoji: '😶‍🌫️', name: 'Face in Clouds' },
{ emoji: '🥴', name: 'Woozy Face' },
{ emoji: '😇', name: 'Smiling Face with Halo' },
{ emoji: '😡', name: 'Pouting Face' },
{ emoji: '🤨', name: 'Face with Raised Eyebrow' },
{ emoji: '😠', name: 'Angry Face' },
{ emoji: '😮', name: 'Face with Open Mouth' },
{ emoji: '🤡', name: 'Clown Face' },
{ emoji: '😇', name: 'Smiling Face with Halo' },
{ emoji: '😲', name: 'Astonished Face' },
{ emoji: '😵‍💫', name: 'Face with Spiral Eyes' },
{ emoji: '🤬', name: 'Face with Symbols on Mouth' },
{ emoji: '😩', name: 'Weary Face' },
{ emoji: '🥺', name: 'Pleading Face' },
{ emoji: '😖', name: 'Confounded Face' },
{ emoji: '😕', name: 'Confused Face' },
{ emoji: '🙃', name: 'Upside-Down Face' },
{ emoji: '😛', name: 'Face with Tongue' },
{ emoji: '🤮', name: 'Face Vomiting' },
{ emoji: '😇', name: 'Smiling Face with Halo' },
{ emoji: '😷', name: 'Face with Medical Mask' },
{ emoji: '🤒', name: 'Face with Thermometer' }

];

const EmojiPicker = ({ onEmojiSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmojis = emojiList.filter(emoji => 
    emoji.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEmojiClick = (emoji) => {
    console.log('Emoji clicked:', emoji);
    onEmojiSelect(emoji);
    setIsOpen(false);
  };

  return (
    <div className="relative ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full transition-colors duration-200"
      >
        <Smile size={24} />
      </button>
      
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden transition-all duration-200 ease-in-out">
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search emojis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search size={18} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto p-2">
            <div className="grid grid-cols-5 gap-2">
              {filteredEmojis.map((emoji) => (
                <button
                  key={emoji.name}
                  onClick={() => handleEmojiClick(emoji.emoji)}
                  className="text-2xl hover:bg-gray-100 rounded p-1 transition-colors duration-200"
                  title={emoji.name}
                >
                  {emoji.emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [message, setMessage] = useState('');

  const handleEmojiSelect = (emoji) => {
    console.log('Emoji selected:', emoji);
    setMessage(prevMessage => prevMessage + emoji);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md ">
      <h1 className="text-2xl font-bold mb-4">Emoji Picker Demo</h1>
      <div className="mb-4">
        <textarea 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded resize-none"
          rows="4"
          placeholder="Type your message here..."
        />
      </div>
      <div className="flex items-center justify-between">
        <EmojiPicker onEmojiSelect={handleEmojiSelect} />
        <span className="text-sm text-gray-600">Click to add an emoji!</span>
      </div>
    </div>
  );
};

export default App;
