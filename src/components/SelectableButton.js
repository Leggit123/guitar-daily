import React from 'react';
import { motion } from 'framer-motion';

const SelectableButton = ({ onClick, children, isSelected }) => {
  
  const combinedClasses = `rounded-full border border-[rgba(255,255,255,0.085)] px-4 py-2 text-xs ${
    isSelected ? 'bg-white text-black' : 'text-custom-cyan bg-transparent'
  }`;

  return (
    <motion.div
      initial={{ scale: 1 }} 
      animate={{ scale: 1 }} 
    >
      <button onClick={onClick} className={combinedClasses}>
        {children}
      </button>
    </motion.div>
  );
};

export default SelectableButton;
