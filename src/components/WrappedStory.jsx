import React, { useState } from 'react';

export default function WrappedStory({ children, isPreview = false }) {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    if (slide < 2) setSlide(slide + 1);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    if (slide > 0) setSlide(slide - 1);
  };

  return (
    <div className="wrapped-container" onClick={nextSlide}>
      <div className="wrapped-progress">
        <div className={`progress-bar ${slide >= 0 ? 'active' : ''}`}></div>
        <div className={`progress-bar ${slide >= 1 ? 'active' : ''}`}></div>
        <div className={`progress-bar ${slide >= 2 ? 'active' : ''}`}></div>
      </div>
      
      {slide > 0 && (
        <button className="wrapped-prev-btn" onClick={prevSlide}>
          {/* Invisible tap zone left */}
        </button>
      )}

      <div className="wrapped-content">
        {slide === 0 && (
          <div className="wrapped-slide slide-in-bottom">
            <h1 className="wrapped-title">Tengo algo especial que decirte...</h1>
            <p className="wrapped-subtitle">Toca la pantalla</p>
          </div>
        )}
        {slide === 1 && (
          <div className="wrapped-slide slide-in-right">
            <h1 className="wrapped-title-big">Prepárate.</h1>
          </div>
        )}
        {slide === 2 && (
          <div className="wrapped-slide zoom-in">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
