import React from 'react';

const ChordButton = ({ onClick, children, isSelected }) => {

  const combinedClasses = `rounded-full border px-4 py-2 text-xs transition-none ease-in-out ${
    isSelected ? 'bg-white text-black' : 'bg-[#2c2a2ac1] text-white border-white'
  }`;

  return (
    <button onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
};

export default ChordButton;
