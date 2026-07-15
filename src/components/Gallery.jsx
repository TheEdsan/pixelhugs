import React from 'react';
import { themes } from '../data/templates';

export default function Gallery({ onSelectTheme }) {
  // Group themes by category
  const categories = themes.reduce((acc, theme) => {
    if (!acc[theme.category]) acc[theme.category] = [];
    acc[theme.category].push(theme);
    return acc;
  }, {});

  return (
    <div className="gallery-container">
      <header className="gallery-header">
        <h1>PixelHugs 🎁</h1>
        <p>Elige un diseño espectacular y personaliza tu carta en segundos.</p>
      </header>

      <div className="gallery-content">
        {Object.keys(categories).map(category => (
          <div key={category} className="category-section">
            <h2 className="category-title">{category}</h2>
            <div className="theme-grid">
              {categories[category].map(theme => (
                <div key={theme.id} className="theme-card" onClick={() => onSelectTheme(theme.id)}>
                  <div className="theme-image-wrapper">
                    <img src={theme.thumbnail} alt={theme.name} loading="lazy" />
                    <div className="theme-overlay">
                      <button className="btn-select">Crear esta carta</button>
                    </div>
                  </div>
                  <div className="theme-info">
                    <h3>{theme.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
