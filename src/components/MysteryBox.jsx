import React, { useState, useEffect } from 'react';

export default function MysteryBox({ children, data, isPreview = false }) {
  const [clicks, setClicks] = useState(0);
  const clicksNeeded = isPreview ? 0 : 3;

  useEffect(() => {
    if (data?.isDemo) {
      const interval = setInterval(() => {
        setClicks(c => (c >= 3 ? 0 : c + 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [data?.isDemo]);

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
