import React, { useEffect, useState, useRef } from 'react';


const ParallaxSection = ({ children, bgImage, speed = 0.5, bgColor = 'bg-transparent' }) => {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const handleScroll = () => {
      if (section) {
        const rect = section.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const offsetTop = rect.top + scrollTop;
        const parallaxOffset = (scrollTop - offsetTop) * speed;
        setOffset(parallaxOffset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={sectionRef}
      className={`h-screen relative overflow-hidden ${bgColor}`}
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center text-white p-6"
        style={{ transform: `translateY(${offset}px)` }}
      >
        {children}
      </div>
    </div>
  );
};

const StickyHeader = () => {
  return (
    <header className="sticky top-0 bg-[#FFC0CB] text-white p-4 z-10">
      <nav className="flex justify-around">
        <a href="#about" className="hover:underline">About</a>
        <a href="#contact" className="hover:underline">Contact</a>
        <a href="#products" className="hover:underline">Products</a>
      </nav>
    </header>
  );
};

const ParallaxExample = () => {
  return (
    <div className="font-sans">
      {/* <StickyHeader /> */}
      <ParallaxSection bgImage="./flowers.jpg" bgColor="bg-blue-800">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Beautiful Flowers</h2>
          <p className="mt-4 text-xl">Discover the beauty and elegance of nature.</p>
        </div>
      </ParallaxSection>
      
      <ParallaxSection bgImage="./pink.jpg" bgColor="bg-green-800" speed={0.7}>
        <div className="text-center">
          <h2 className="text-3xl font-semibold">Pink Delight</h2>
          <p className="mt-4 text-xl">Embrace the soft, serene vibes of pink.</p>
        </div>
      </ParallaxSection>
      
      <ParallaxSection bgImage="./white.jpg" bgColor="bg-red-800" speed={0.3}>
        <div className="text-center">
          <h2 className="text-3xl font-semibold">Elegant Whites</h2>
          <p className="mt-4 text-xl">Experience the tranquility of white elegance.</p>
        </div>
      </ParallaxSection>
      
      <ParallaxSection bgImage="./last.jpg" bgColor="bg-gray-800" speed={0.5}>
        <div className="text-center">
          <h2 className="text-4xl font-bold">Final Showcase</h2>
          <p className="mt-4 text-xl">A grand finale to our parallax journey.</p>
        </div>
      </ParallaxSection>
    </div>
  );
};

export default ParallaxExample;
