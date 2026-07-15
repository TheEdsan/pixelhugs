import React, { useState } from 'react';

export default function BottleOcean({ children, isPreview = false }) {
  const [isOpen, setIsOpen] = useState(isPreview);

  return (
    <div className="ocean-container">
      <div className="ocean-waves"></div>
      <div className="ocean-waves wave-2"></div>
      
      {!isOpen ? (
        <div className="floating-bottle" onClick={() => setIsOpen(true)}>
          <div className="bottle-cork"></div>
          <div className="bottle-glass">
            <div className="bottle-scroll"></div>
          </div>
          <p className="bottle-hint">Toca la botella</p>
        </div>
      ) : (
        <div className="scroll-paper animate-pop-in">
          {children}
        </div>
      )}
    </div>
  );
}
