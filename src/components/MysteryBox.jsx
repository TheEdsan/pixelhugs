import React, { useState } from 'react';

export default function MysteryBox({ children, isPreview = false }) {
  const [clicks, setClicks] = useState(0);
  const clicksNeeded = isPreview ? 0 : 3;

  const handleClick = () => {
    if (clicks < clicksNeeded) {
      setClicks(clicks + 1);
    }
  };

  const isOpen = clicks >= clicksNeeded;

  return (
    <div className="mystery-box-container" onClick={handleClick}>
      {!isOpen && (
        <div className={`mystery-box ${clicks > 0 ? 'shake' : ''}`} style={{ animationDuration: `${0.5 - (clicks * 0.1)}s` }}>
          <div className="box-lid"></div>
          <div className="box-body">
            <div className="box-ribbon-v"></div>
            <div className="box-ribbon-h"></div>
          </div>
          <p className="box-hint">
            {clicks === 0 ? "¡Toca para abrir!" : clicks === 1 ? "¡Casi!" : "¡Una vez más!"}
          </p>
        </div>
      )}

      {isOpen && (
        <div className="mystery-reveal animate-pop-in">
          <div className="confetti-burst">🎉</div>
          {children}
        </div>
      )}
    </div>
  );
}
