import React, { useState } from 'react';

const FlexboxDemo = () => {
  const [flexDirection, setFlexDirection] = useState('row');
  const [justifyContent, setJustifyContent] = useState('flex-start');
  const [alignItems, setAlignItems] = useState('stretch');

  const flexDirections = ['row', 'row-reverse', 'column', 'column-reverse'];
  const justifyContentOptions = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'];
  const alignItemsOptions = ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'];

  const containerStyle = {
    display: 'flex',
    flexDirection,
    justifyContent,
    alignItems,
    height: '200px',
    border: '2px solid #333',
    margin: '20px 0',
  };

  const itemStyle = {
    width: '50px',
    height: '50px',
    margin: '5px',
    backgroundColor: '#3498db',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Flexbox Demonstration</h2>
      
      <div className="mb-4">
        <label className="block mb-2">Flex Direction:</label>
        <select 
          value={flexDirection} 
          onChange={(e) => setFlexDirection(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {flexDirections.map(direction => (
            <option key={direction} value={direction}>{direction}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Justify Content:</label>
        <select 
          value={justifyContent} 
          onChange={(e) => setJustifyContent(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {justifyContentOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Align Items:</label>
        <select 
          value={alignItems} 
          onChange={(e) => setAlignItems(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {alignItemsOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div style={containerStyle}>
        <div style={itemStyle}>1</div>
        <div style={itemStyle}>2</div>
        <div style={itemStyle}>3</div>
      </div>

      <div className="mt-4">
        <h3 className="font-bold">Current Settings:</h3>
        <p>Flex Direction: {flexDirection}</p>
        <p>Justify Content: {justifyContent}</p>
        <p>Align Items: {alignItems}</p>
      </div>
    </div>
  );
};

export default FlexboxDemo;