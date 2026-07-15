import React, { useState, useEffect } from 'react';

export default function Constellation({ children, data, isPreview = false }) {
  const [stars, setStars] = useState([]);
  const [connections, setConnections] = useState([]);
  const [isComplete, setIsComplete] = useState(isPreview);

  useEffect(() => {
    // Generate random stars
    const newStars = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80
    }));
    setStars(newStars);
  }, []);

  const handleStarClick = (id) => {
    if (isComplete) return;
    if (!connections.includes(id)) {
      const newConns = [...connections, id];
      setConnections(newConns);
      if (newConns.length === stars.length) {
        setTimeout(() => setIsComplete(true), 1000);
      }
    }
  };

  return (
    <div className="constellation-container">
      {isComplete ? (
        <div className="animate-pop-in celestial-message">
          <div className="moon-glow"></div>
          {children}
        </div>
      ) : (
        <div className="starfield">
          <p className="constellation-hint">Conecta las estrellas para leer el mensaje de los astros...</p>
          <svg className="star-lines">
            {connections.length > 1 && connections.map((starId, index) => {
              if (index === 0) return null;
              const prev = stars.find(s => s.id === connections[index - 1]);
              const curr = stars.find(s => s.id === starId);
              if (!prev || !curr) return null;
              return (
                <line 
                  key={index}
                  x1={`${prev.x}%`} y1={`${prev.y}%`}
                  x2={`${curr.x}%`} y2={`${curr.y}%`}
                  stroke="rgba(255,255,255,0.4)" strokeWidth="2"
                />
              );
            })}
          </svg>
          {stars.map(star => (
            <div 
              key={star.id}
              className={`star ${connections.includes(star.id) ? 'active' : ''}`}
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              onClick={() => handleStarClick(star.id)}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}
