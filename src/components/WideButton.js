import React from 'react';

const WideButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="mt-5 w-full bg-[#0ff] rounded-md text-[#000000bc] py-2"
    >
      {children}
    </button>
  );
};

export default WideButton;
