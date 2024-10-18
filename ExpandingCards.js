import { useState } from 'react';

const ExpandingCards = () => {
  const cards = [
    {
      title: "Mountain",
      bgColor: "bg-blue-500",
      image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
    },
    {
      title: "Ocean",
      bgColor: "bg-teal-500",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
    },
    {
      title: "Forest",
      bgColor: "bg-green-500",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZXN0fGVufDB8fDB8fHww"
    },
    {
      title: "Desert",
      bgColor: "bg-yellow-600",
      image: "https://images.unsplash.com/photo-1514471244491-6fb96fcdf04f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGVzZXJ0fGVufDB8fDB8fHww"
    },
    {
      title: "City",
      bgColor: "bg-purple-500",
      image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eXxlbnwwfHwwfHx8MA%3D%3D"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="flex gap-2 h-[500px]">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`relative h-full cursor-pointer transition-all duration-500 ease-in-out
              ${card.bgColor} rounded-lg
              ${activeIndex === index ? 'w-64' : 'w-14'}`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {/* Background Image */}
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
            
            {/* Overlay when expanded */}
            <div className={`absolute bottom-0 left-0 right-0 p-4 text-white bg-black bg-opacity-50
              transition-opacity duration-300
              ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}>
              <h3 className="text-xl font-bold">{card.title}</h3>
            </div>
            
            {/* Vertical title when collapsed */}
            <div className={`absolute inset-0 flex items-center justify-center
              transition-opacity duration-300
              ${activeIndex === index ? 'opacity-0' : 'opacity-100'}`}>
              <span className="text-white font-bold text-lg rotate-[-90deg] whitespace-nowrap">
                {card.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpandingCards;
