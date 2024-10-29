import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button className="space-button">
        <div className="planet" />
        <div className="button-flex">
          <svg className="moon" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" fill="#000000">
            <circle fill="#66757F" cx={18} cy={18} r={18}></circle>
            <circle fill="#5B6876" cx="10.5" cy="8.5" r="3.5"></circle>
            <circle fill="#5B6876" cx={20} cy={16} r={3}></circle>
            <circle fill="#5B6876" cx="21.5" cy="27.5" r="3.5"></circle>
          </svg>
          <span className="title">Launch</span>
        </div>
        <svg className="rocket" viewBox="0 0 369.998 369.997" stroke="#ffffff">
          <path d="M369.993,6.919c0.022-1.846-0.692-3.622-1.998-4.927..."></path>
        </svg>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .space-button {
    position: relative;
    display: flex;
    align-items: center;
    width: 200px;
    height: 60px;
    background-color: #293944;
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.3s ease-out;
    box-shadow: 2px 19px 31px rgba(0, 0, 0, 0.2);
  }

  .title {
    color: wheat;
    font-weight: bold;
    margin-right: 10px;
    font-size: 20px;
  }

  .planet {
    position: absolute;
    width: 15px;
    height: 15px;
    top: 10px;
    left: 10px;
    background-color: rgb(224, 236, 224);
    border-radius: 50%;
    box-shadow: inset rgb(211, 203, 177) -20px -20px 70px;
  }

  .space-button:after {
    content: "";
    position: absolute;
    bottom: -50%;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #688ACC;
    transform-origin: bottom center;
    transition: transform 600ms cubic-bezier(0.48, 0, 0.12, 1);
    transform: skewY(10deg) scaleY(0);
    z-index: 2;
  }

  .space-button:hover:after {
    transform: skewY(9.3deg) scaleY(2);
  }

  .space-button:active {
    transform: translateY(0);
    border: 1px solid rgba(30, 255, 0, 0.171);
  }

  .rocket {
    position: absolute;
    opacity: 0;
    bottom: 10%;
    height: 40%;
    transform: translateY(225%) translateX(-50%);
    transition: all 500ms cubic-bezier(0.48, 0, 0.12, 1);
    z-index: 3;
  }

  .button-flex {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    padding: 0 20px;
    height: 100%;
    width: 100%;
  }

  .space-button:hover .rocket {
    fill: white;
    animation: shake 0.1s infinite;
    transform: translateX(-50%) translateY(-100%);
    opacity: 1;
    transition: all 0.9s cubic-bezier(0.48, 0, 0.12, 1);
  }

  @keyframes shake {
    0% {
      transform: translate(-1px, 1px);
    }
    100% {
      transform: translate(1px, -1px);
    }
  }
`;

export default Button;
