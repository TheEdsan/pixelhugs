import React, { useState, useRef } from 'react';

export default function RunawayButton({ children, data, isPreview = false }) {
  const [accepted, setAccepted] = useState(false);
  const noBtnRef = useRef(null);

  const handleNoHover = () => {
    if (isPreview) return;
    const btn = noBtnRef.current;
    if (btn) {
      const x = Math.random() * 200 - 100;
      const y = Math.random() * 200 - 100;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  const handleYes = () => {
    setAccepted(true);
  };

  if (accepted) {
    return (
      <div className="runaway-success animate-pop-in">
        <div className="confetti-burst">❤️</div>
        {children}
      </div>
    );
  }

  return (
    <div className="runaway-container">
      <h1 className="runaway-question">{data.question || "¿Me perdonas?"}</h1>
      <div className="runaway-actions">
        <button className="btn-yes" onClick={handleYes}>¡Sí!</button>
        <button 
          ref={noBtnRef} 
          className="btn-no" 
          onMouseEnter={handleNoHover}
          onTouchStart={handleNoHover}
          onClick={handleNoHover}
        >
          No
        </button>
      </div>
    </div>
  );
}
