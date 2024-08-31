import React from 'react';
import { Sun, Moon, Cloud, Zap } from 'lucide-react';

const ShadowCard = ({ icon: Icon, title, shadowClass }) => (
  <div className={`bg-white rounded-lg p-8 ${shadowClass} transition-transform transform-gpu duration-500 hover:scale-110 hover:rotate-2`}>
    <Icon className="w-16 h-16 mb-4 text-blue-600" />
    <h3 className="text-xl font-extrabold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-700 text-sm">Experience the {title.toLowerCase()} shadow effect in this card.</p>
  </div>
);

const ShadowShowcase = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-10">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900">Shadow Showcase</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <ShadowCard 
          icon={Sun} 
          title="Soft Shadow" 
          shadowClass="shadow-lg hover:shadow-2xl"
        />
        <ShadowCard 
          icon={Moon} 
          title="Hard Shadow" 
          shadowClass="shadow-2xl hover:shadow-4xl"
        />
        <ShadowCard 
          icon={Cloud} 
          title="Colored Shadow" 
          shadowClass="shadow-2xl shadow-blue-500/60 hover:shadow-blue-500/80"
        />
        <ShadowCard 
          icon={Zap} 
          title="Inset Shadow" 
          shadowClass="shadow-inner hover:shadow-inner-lg"
        />
      </div>
    </div>
  );
};

export default ShadowShowcase;
