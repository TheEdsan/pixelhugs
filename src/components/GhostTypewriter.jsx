import React, { useState, useEffect } from 'react';

export default function GhostTypewriter({ children, data, isPreview = false }) {
  const fullText = data.message || "Escribiendo desde el más allá...";
  const [displayedText, setDisplayedText] = useState(isPreview ? fullText : '');

  useEffect(() => {
    if (isPreview) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.substring(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [fullText, isPreview]);

  return (
    <div className="typewriter-container">
      <div className="candle-light"></div>
      <div className="typewriter-paper">
        <h2 className="typewriter-to">Para: {data.toName}</h2>
        <p className="typewriter-text">{displayedText}<span className="cursor">|</span></p>
        {displayedText === fullText && (
          <div className="typewriter-from animate-pop-in">
            Con cariño, {data.fromName}
          </div>
        )}
      </div>
      {/* Hide the actual children to use custom typewriter rendering, or render them invisibly to satisfy layout */}
      <div style={{ display: 'none' }}>{children}</div>
    </div>
  );
}
