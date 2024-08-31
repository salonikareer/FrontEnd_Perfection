import React from 'react';

const Card = ({ title, date, description }) => (
  <div className="bg-[#202022] text-[#ffffffda] p-6 max-w-[15rem] flex flex-col transition-transform duration-150 ease-in-out transform hover:scale-110 hover:shadow-lg hover:z-10 hover:opacity-100">
    <h2 className="relative text-lg font-medium mb-4">
      {title}
      <span className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full shadow-inner bg-transparent border border-[#bb86fc]"></span>
    </h2>
    <p className="text-[#bb86fc] text-sm mb-4">{date}</p>
    <p className="text-sm">{description}</p>
  </div>
);

const HoverEffect = () => {
  return (
    <div className="h-screen bg-[#151515] flex items-center justify-center">
      <div className="grid grid-cols-2 gap-3 p-4">
        <Card title="Card One" date="May 25, 2021" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores alias ut veniam?" />
        <Card title="Card Two" date="May 26, 2021" description="If you read carefully, you'll find that this is not your typical lorem ipsum." />
        <Card title="Card Three" date="May 27, 2021" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores alias ut veniam?" />
        <Card title="Card Four" date="May 28, 2021" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores alias ut veniam?" />
      </div>
    </div>
  );
}

export default HoverEffect;
