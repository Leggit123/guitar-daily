import React from 'react';
import guitarImage from '../assets/images/guitar.png';

const GuitarImage = () => {
  return (
    <img
      src={guitarImage}
      alt="Guitar"
      className="fixed left-0 bottom-0 w-[300px] h-auto object-contain pointer-events-none z-10"
      style={{ maxWidth: '100vw', maxHeight: '100vh', overflow: 'hidden' }}
    />
  );
};

export default GuitarImage;
