// WideCard.js
import React from 'react';

const WideCard = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-[#3030303f] flex flex-col items-center p-8 mt-16 mb-16 rounded-[22px] border border-[#cccccc2e] mx-auto w-full max-w-[600px]`}
    >
      {children}
    </div>
  );
};

export default WideCard;
