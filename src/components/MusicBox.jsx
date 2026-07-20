import React, { useState, useEffect } from 'react';

export default function MusicBox({ children, data, isPreview = false }) {
  const [isPlaying, setIsPlaying] = useState(isPreview);
  const [rotations, setRotations] = useState(0);

  useEffect(() => {
    if (data?.isDemo) {
      const interval = setInterval(() => {
        setRotations(r => {
          if (r >= 5) {
            setIsPlaying(true);
            setTimeout(() => { setIsPlaying(false); setRotations(0); }, 2000);
            return r;
          }
          return r + 1;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [data?.isDemo]);

  const handleWind = () => {
    if (isPreview) return;
    const newRots = rotations + 1;
    setRotations(newRots);
    if (newRots >= 5) {
      setIsPlaying(true);
    }
  };

  return (
    <div className="music-box-container">
      {!isPlaying ? (
        <div className="music-box-closed">
          <p className="music-hint">Haz clic en la manivela para darle cuerda (faltan {5 - rotations})</p>
          <div className="box-base">
            <div 
              className={`crank ${rotations > 0 ? 'turning' : ''}`} 
              onClick={handleWind}
              style={{ transform: `rotate(${rotations * 72}deg)` }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="music-box-open animate-pop-in">
          <div className="music-notes">
            <span>🎵</span><span>🎶</span><span>♩</span>
          </div>
          <div className="music-message">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
