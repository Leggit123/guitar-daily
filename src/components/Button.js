import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Button = ({ to, onClick, children, className }) => {
  
  const combinedClasses = `rounded-full border border-[rgba(255,255,255,0.085)] px-4 py-2 text-xs transition-all duration-200 ease-in-out hover:bg-[#383737c1] ${className || 'text-custom-cyan'}`;

  if (to) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        initial={{ scale: 1 }} 
        animate={{ scale: 1 }} 
      >
        <Link to={to} className={combinedClasses}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }} 
      initial={{ scale: 1 }} 
      animate={{ scale: 1 }} 
    >
      <button onClick={onClick} className={combinedClasses}>
        {children}
      </button>
    </motion.div>
  );
};

export default Button;
