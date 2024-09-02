import React from 'react';
import tunityLogo from '../assets/images/tunity.png'; 

const FooterLogo = () => {
  return (
    <div className="fixed bottom-4 right-8 flex items-center space-x-2 text-custom-cyan opacity-80">
      <p className="text-xs">Powered by</p>
      <img 
        src={tunityLogo} 
        alt="Tunity Logo" 
        className="w-14 h-14" 
        style={{ objectFit: 'contain' }} 
      />
    </div>
  );
};

export default FooterLogo;
