import React, { useState, useCallback } from "react";

const IconBackspace = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
    <line x1="18" y1="9" x2="12" y2="15"/>
    <line x1="12" y1="9" x2="18" y2="15"/>
  </svg>
);

const IconCapsLock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m17 11-5-5-5 5"/>
    <path d="m17 18-5-5-5 5"/>
  </svg>
);

const IconEnter = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6a6 6 0 0 0 6-6v-1a6 6 0 0 0-6-6H5"/>
    <path d="m5 5 4 4-4 4"/>
  </svg>
);

const IconShift = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 8-6-6-6 6"/>
    <path d="M12 2v20"/>
  </svg>
);

const IconTab = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const Virtualboard = () => {
  const [inputText, setInputText] = useState("");
  const [isCaps, setIsCaps] = useState(false);
  const [isShift, setIsShift] = useState(false);

  const handleKeyClick = useCallback((key: string) => {
    switch (key) {
      case "Enter":
        setInputText((prev) => prev + "\n");
        break;
      case "Space":
        setInputText((prev) => prev + " ");
        break;
      case "Backspace":
        setInputText((prev) => prev.slice(0, -1));
        break;
      case "Caps Lock":
        setIsCaps((prev) => !prev);
        break;
      case "Shift":
        setIsShift((prev) => !prev);
        break;
      case "Tab":
        setInputText((prev) => prev + "    ");
        break;
      default:
        if (key.length === 1) {
          let char = key;
          if (isCaps !== isShift) {
            char = char.toUpperCase();
          }
          setInputText((prev) => prev + char);
        }
    }
    if (key !== "Shift" && isShift) {
      setIsShift(false);
    }
  }, [isCaps, isShift]);

  const renderKey = useCallback((key: string, width: string = "w-12") => {
    let content: React.ReactNode = key;
    switch (key) {
      case "Backspace":
        content = <IconBackspace />;
        break;
      case "Caps Lock":
        content = <IconCapsLock />;
        break;
      case "Enter":
        content = <IconEnter />;
        break;
      case "Shift":
        content = <IconShift />;
        break;
      case "Tab":
        content = <IconTab />;
        break;
      case "Space":
        content = null;
        width = "w-64";
        break;
    }

    const isActive = (isCaps && key === "Caps Lock") || (isShift && key === "Shift");

    return (
      <button
        key={key}
        className={`
          ${width} h-12 m-0.5 p-0 text-xs sm:text-sm
          rounded-md border border-gray-300
          ${isActive 
            ? "bg-blue-100 border-blue-300 text-blue-700" 
            : "bg-white text-gray-700 hover:bg-gray-50"}
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
          flex items-center justify-center
        `}
        onClick={() => handleKeyClick(key)}
      >
        {content}
      </button>
    );
  }, [handleKeyClick, isCaps, isShift]);

  const keyboardLayout = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
    ['Space']
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Enhanced Virtual Keyboard</h1>
      
      <div className="w-full max-w-3xl h-40 mb-4 p-4 rounded-md bg-white shadow-inner overflow-auto">
        <pre className="whitespace-pre-wrap break-words text-lg">{inputText}</pre>
      </div>

      <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center mb-1">
            {row.map((key) => renderKey(key, key === "Backspace" || key === "Enter" ? "w-20" : undefined))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Virtualboard;
