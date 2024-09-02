import React, { useState, useEffect, useRef } from 'react';


const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxwYXRoIGZpbGw9Im5vbmUiIGQ9Ik0wIDBoMXZINnYxSCIvPjwvc3ZnPg=='; 

const LazyImage = ({ src, alt, className, width = '400px', height = '380px' }) => {
  const [loaded, setLoaded] = useState(false); 
  const imageRef = useRef(null); 

 
  useEffect(() => {
    const currentRef = imageRef.current; 

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoaded(true); 
            observer.disconnect(); 
          }
        });
      },
      {
        rootMargin: '100px', 
      }
    );

    if (currentRef) {
      observer.observe(currentRef); 
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef); 
      }
    };
  }, [imageRef]);

  return (
    <img
      ref={imageRef}
      src={loaded ? src : PLACEHOLDER_IMAGE} 
      alt={alt}
      className={className}
      style={{
        width, 
        height, 
        maxWidth: '100%', 
        display: 'block',
        objectFit: 'contain', 
        borderRadius: '8px', 
        transition: 'opacity 0.5s ease', 
      }}
      onLoad={() => setLoaded(true)} 
    />
  );
};

export default LazyImage;
