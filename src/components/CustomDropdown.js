import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown = ({ options, selectedValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  
  const handleToggle = () => setIsOpen(!isOpen);

  
  const handleSelect = (value) => {
    if (onChange && typeof onChange === 'function') {
      onChange(value); 
    } else {
      console.error('Error: onChange is not a valid function'); 
    }
    setIsOpen(false); 
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block w-full">
      <button
        className="w-full bg-[#1e1e1e] text-white px-4 py-2 border border-[#cccccc50] rounded-md appearance-none text-left"
        onClick={handleToggle}
      >
        {selectedValue || 'Select Duration (Optional)'} 
      </button>

      
      {isOpen && (
        <div className="absolute mt-1 w-full bg-[#1e1e1e] border border-[#cccccc50] rounded-md shadow-lg z-10">
          {options.map((option, index) => (
            <div
              key={index}
              className="cursor-pointer px-4 py-2 hover:bg-[#383737] text-white text-lg"
              onClick={() => handleSelect(option.value)}
            >
              {option.label} 
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
