import React, { useEffect, useRef, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const FormField = ({ type, value, onChange, placeholder, readOnly, className, style }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 
  const textareaRef = useRef(null);

  useEffect(() => {
    if (type === 'textarea' && textareaRef.current) {
      textareaRef.current.style.height = 'auto'; 
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; 
    }
  }, [value, type]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevVisibility) => !prevVisibility);
  };

  if (type === 'textarea') {
    return (
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`bg-[#1e1e1e] text-white px-4 py-2 border border-[#cccccc50] rounded-md w-full resize-none ${className}`} 
        style={{
          minHeight: '40px',
          width: '100%',  
          boxSizing: 'border-box',  
          ...style,
          overflow: 'hidden',
        }}
        rows={1}
      />
    );
  }

  
  return (
    <div className="relative w-full">
      <input
        type={type === 'password' && isPasswordVisible ? 'text' : type} 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`bg-[#1e1e1e] text-white px-4 py-2 pr-10 border border-[#cccccc50] rounded-md w-full ${className}`}
        style={{
          ...style,
        }}
      />
      {type === 'password' && (
        <span
          className="absolute right-3 top-1/2 transform -translate-y-[50%] cursor-pointer text-gray-400"
          style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? <FaEyeSlash /> : <FaEye />} 
        </span>
      )}
    </div>
  );
};

export default FormField;
