import React from 'react';

const HoverCard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#43345d]">
      <div className="relative w-[1100px] flex items-center justify-center flex-wrap p-8">
        <div className="relative max-w-[300px] h-[200px] bg-white m-8 mx-2.5 p-5 px-4 flex flex-col shadow-lg transition-all duration-300 ease-in-out rounded-lg hover:h-[320px] overflow-hidden">
          <div className="relative w-full h-[200px] shadow-md z-10">
            <img
              src="https://i.pinimg.com/originals/a4/7b/a5/a47ba59b4a353e0928ef0551ca44f980.jpg"
              alt="Example"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 top-[200px] p-4 text-black text-center bg-white bg-opacity-75 rounded-b-lg opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100">
            <h3 className="text-lg font-semibold">This is content</h3>
            <p className="mt-2">
              In publishing and graphic design
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HoverCard;
