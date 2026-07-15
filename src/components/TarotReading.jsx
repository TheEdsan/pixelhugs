import React, { useState } from 'react';

export default function TarotReading({ children, isPreview = false }) {
  const [flipped, setFlipped] = useState([false, false, false]);
  const isAllFlipped = flipped.every(f => f === true) || isPreview;

  const handleFlip = (index) => {
    if (isPreview) return;
    const newFlipped = [...flipped];
    newFlipped[index] = true;
    setFlipped(newFlipped);
  };

  if (isAllFlipped) {
    return <div className="animate-pop-in tarot-final">{children}</div>;
  }

  return (
    <div className="tarot-container">
      <p className="tarot-hint">Las estrellas han hablado. Voltea las 3 cartas para descubrir tu destino.</p>
      <div className="tarot-cards">
        {[0, 1, 2].map((i) => (
          <div 
            key={i} 
            className={`tarot-card ${flipped[i] ? 'flipped' : ''}`}
            onClick={() => handleFlip(i)}
          >
            <div className="tarot-card-inner">
              <div className="tarot-card-front">
                🌙
              </div>
              <div className="tarot-card-back">
                {i === 0 ? 'Pasado' : i === 1 ? 'Presente' : 'Futuro'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
