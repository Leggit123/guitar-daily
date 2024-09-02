import React from 'react';

const WideCard = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-[#3030303f] flex flex-col items-center p-3 sm:p-4 mt-6 mb-6 rounded-[16px] border border-[#cccccc2e] mx-auto w-full max-w-[350px] sm:max-w-[500px] min-h-[100px] ${className}`}
    >
      {children}
    </div>
  );
};

export default WideCard;
