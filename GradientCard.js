import React from 'react';
import './App.css'; // Ensure Tailwind CSS is imported here if needed

const Card = ({ title, description, gradient }) => (
  <div className="relative w-[320px] h-[400px] flex justify-center items-center m-10 transition-transform duration-500 ease-in-out group">
    <div className={`absolute top-0 left-12 w-1/2 h-full bg-white rounded-lg transform skew-x-12 transition-transform duration-500 ease-in-out group-hover:skew-x-0 group-hover:left-5 group-hover:w-[calc(100%-70px)] ${gradient} filter blur-[30px]`} />
    <div className={`absolute top-0 left-12 w-1/2 h-full bg-white rounded-lg transform skew-x-12 transition-transform duration-500 ease-in-out group-hover:skew-x-0 group-hover:left-5 group-hover:w-[calc(100%-70px)] ${gradient} filter blur-[30px]`} />
    <span className="absolute inset-0 z-10 pointer-events-none">
      <div className="absolute top-0 left-0 w-0 h-0 rounded-lg bg-white/10 backdrop-blur-sm opacity-0 transition-all duration-100 ease-in-out group-hover:top-[-50px] group-hover:left-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100 shadow-md" />
      <div className="absolute bottom-0 right-0 w-full h-full rounded-lg bg-white/10 backdrop-blur-sm opacity-0 transition-all duration-500 ease-in-out group-hover:bottom-[-50px] group-hover:right-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100 shadow-md" />
    </span>
    <div className="relative p-8 bg-white/5 backdrop-blur-sm shadow-md rounded-lg z-20 transition-all duration-500 ease-in-out group-hover:translate-x-[-25px] group-hover:py-16">
      <h2 className="text-2xl text-white mb-2">{title}</h2>
      <p className="text-lg text-white mb-2">{description}</p>
      <a href="#" className="inline-block text-lg text-black bg-white px-3 py-2 rounded-md font-bold hover:bg-[#ffcf4d] hover:border hover:border-[#ff0058] hover:shadow-lg transition-all duration-300 ease-in-out">Read More</a>
    </div>
  </div>
);

const GradientCard = () => {
  return (
    <div className="h-screen bg-[#1d061a] flex items-center justify-center">
      <div className="flex flex-wrap justify-center p-10">
        <Card
          title="Card One"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          gradient="bg-gradient-to-r from-[#ffbc00] to-[#ff0058]"
        />
        <Card
          title="Card Two"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          gradient="bg-gradient-to-r from-[#03a9f4] to-[#ff0058]"
        />
        <Card
          title="Card Three"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          gradient="bg-gradient-to-r from-[#4dff03] to-[#00d0ff]"
        />
      </div>
    </div>
  );
}

export default GradientCard;
