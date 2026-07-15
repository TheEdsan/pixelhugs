import React, { useState, useEffect } from 'react';

export default function SlidingPuzzle({ children, isPreview = false }) {
  const size = 3;
  const [tiles, setTiles] = useState([]);
  const [isSolved, setIsSolved] = useState(isPreview);

  useEffect(() => {
    if (isPreview) return;
    let initialTiles = Array.from({ length: size * size }, (_, i) => i);
    // Simple shuffle
    for (let i = initialTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [initialTiles[i], initialTiles[j]] = [initialTiles[j], initialTiles[i]];
    }
    setTiles(initialTiles);
  }, [isPreview]);

  const handleTileClick = (index) => {
    if (isSolved) return;
    const emptyIndex = tiles.indexOf(size * size - 1); // 8 is the empty tile
    const row = Math.floor(index / size);
    const col = index % size;
    const emptyRow = Math.floor(emptyIndex / size);
    const emptyCol = emptyIndex % size;

    if (Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      
      if (newTiles.every((val, i) => val === i)) {
        setTimeout(() => setIsSolved(true), 500);
      }
    }
  };

  if (isSolved || isPreview) {
    return <div className="animate-pop-in puzzle-solved">{children}</div>;
  }

  return (
    <div className="puzzle-container">
      <p className="puzzle-hint">Resuelve el puzzle para desbloquear la carta</p>
      <div className="puzzle-grid">
        {tiles.map((tileVal, index) => {
          const isEmpty = tileVal === size * size - 1;
          return (
            <div 
              key={index}
              className={`puzzle-tile ${isEmpty ? 'empty' : ''}`}
              onClick={() => handleTileClick(index)}
            >
              {!isEmpty && tileVal + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
}
