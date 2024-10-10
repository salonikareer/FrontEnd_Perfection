import React, { useState } from 'react';

const RadioInputWithBall = () => {
  const [selectedValue, setSelectedValue] = useState('one');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '210px',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
  };

  const radioGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const choiceStyle = {
    position: 'relative',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyle = {
    appearance: 'none',
    height: '41px',
    width: '41px',
    borderRadius: '50%',
    border: '9px solid rgba(245, 245, 245, 0.45)',
    cursor: 'pointer',
    marginRight: '15px',
    boxShadow: '0px 0px 20px -13px gray, 0px 0px 20px -14px gray inset',
    zIndex: 1,
  };

  const ballStyle = (isSelected) => ({
    position: 'absolute',
    left: 0,
    top: 0,
    width: '41px',
    height: '41px',
    borderRadius: '50%',
    backgroundColor: 'rgb(232, 232, 232)',
    transform: isSelected ? 'translateX(0px)' : 'translateX(-95px)',
    transition: 'transform 800ms cubic-bezier(1, -0.4, 0, 1.4)',
    boxShadow: 'rgba(0, 0, 0, 0.17) 0px -10px 10px 0px inset, rgba(0, 0, 0, 0.15) 0px -15px 15px 0px inset, rgba(0, 0, 0, 0.1) 0px -40px 20px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
    zIndex: 0,
  });

  const labelStyle = {
    color: 'rgb(177, 176, 176)',
    fontSize: '35px',
    fontWeight: '900',
    fontFamily: 'monospace',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <div style={radioGroupStyle}>
        {['one', 'two', 'three'].map((value, index) => (
          <div key={value} style={choiceStyle}>
            <div style={{ position: 'relative', width: '41px', height: '41px' }}>
              <input
                type="radio"
                id={value}
                name="number-selector"
                value={value}
                checked={selectedValue === value}
                onChange={handleChange}
                style={inputStyle}
              />
              <div style={ballStyle(selectedValue === value)}></div>
            </div>
            <label htmlFor={value} style={labelStyle}>
              {index + 1}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioInputWithBall;