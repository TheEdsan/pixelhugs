import React, { useState } from 'react';

export default function Minesweeper({ children, isPreview = false }) {
  const size = 4;
  const totalCells = size * size;
  const totalBombs = 3;
  
  // Hardcoded for demo: bombs at index 2, 7, 12
  const bombIndices = [2, 7, 12];
  
  const [revealed, setRevealed] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [isWon, setIsWon] = useState(isPreview);

  const handleClick = (index) => {
    if (gameOver || isWon) return;

    if (bombIndices.includes(index)) {
      setGameOver(true);
    } else {
      const newRevealed = [...revealed, index];
      setRevealed(newRevealed);
      if (newRevealed.length === totalCells - totalBombs) {
        setIsWon(true);
      }
    }
  };

  const handleRetry = () => {
    setRevealed([]);
    setGameOver(false);
  };

  if (isWon) {
    return <div className="animate-pop-in">{children}</div>;
  }

  return (
    <div className="minesweeper-container">
      <p className="minesweeper-hint">Encuentra los corazones sin pisar las bombas para leer el mensaje.</p>
      <div className="minesweeper-grid">
        {Array.from({ length: totalCells }).map((_, index) => {
          const isRevealed = revealed.includes(index);
          const isBomb = bombIndices.includes(index);
          
          return (
            <div 
              key={index} 
              className={`mine-cell ${isRevealed ? 'revealed' : ''} ${gameOver && isBomb ? 'exploded' : ''}`}
              onClick={() => handleClick(index)}
            >
              {isRevealed && !isBomb && '❤️'}
              {gameOver && isBomb && '💣'}
            </div>
          );
        })}
      </div>
      {gameOver && (
        <button className="btn-retry animate-pop-in" onClick={handleRetry}>Intentar de nuevo</button>
      )}
    </div>
  );
}
