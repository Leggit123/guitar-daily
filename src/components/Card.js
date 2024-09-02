import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-[#3030303f] flex flex-col items-stretch p-8 rounded-[22px] border border-[#cccccc2e] mx-auto w-[90%] max-w-[600px] mt-24 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
