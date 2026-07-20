import React, { useState } from 'react';
import { themes } from '../data/templates';
import LiveThumbnail from './LiveThumbnail';
import AdBanner from './AdBanner';
import TipJarModal from './TipJarModal';
import HeroCarousel from './HeroCarousel';

export default function Gallery({ onSelectTheme }) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [showTipJar, setShowTipJar] = useState(false);

  // Extract unique categories
  const categories = ['Todos', ...new Set(themes.map(t => t.category))];

  const filteredThemes = activeCategory === 'Todos' 
    ? themes 
    : themes.filter(t => t.category === activeCategory);

  const scrollToGallery = (e) => {
    e.preventDefault();
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">Zero Database • 100% Privado</div>
        <h1 className="hero-title">
          No envíes textos aburridos.<br />
          <span>Regala Experiencias.</span>
        </h1>
        <p className="hero-subtitle">
          PixelHugs te permite crear páginas web interactivas y virales para sorprender a esa persona especial. Desde cronómetros de amor en vivo hasta tarjetas que tienes que "raspar" para leer.
        </p>
        <a href="#gallery" onClick={scrollToGallery} className="hero-cta">
          Empezar a Crear ✨
        </a>
      </section>

      {/* How it works */}
      <section className="steps-section">
        <div className="steps-container">
          <div className="step-item">
            <div className="step-number">1</div>
            <h3 className="step-title">Elige un Diseño</h3>
            <p className="step-desc">Selecciona entre estilos artísticos, minimalistas o acuarelas.</p>
          </div>
          <div className="step-item">
            <div className="step-number">2</div>
            <h3 className="step-title">Añade Magia</h3>
            <p className="step-desc">Escribe tu mensaje y elige una experiencia viral (ej. Candado PIN).</p>
          </div>
          <div className="step-item">
            <div className="step-number">3</div>
            <h3 className="step-title">Comparte el Link</h3>
            <p className="step-desc">Toda la información se encripta en el enlace. 100% privado.</p>
          </div>
        </div>
      </section>

      {/* Hero Showcase Carousel (Moved down) */}
      <HeroCarousel onSelectTheme={onSelectTheme} />

      {/* The Gallery */}
      <section id="gallery" className="gallery-section">
        <h2 className="section-title">Elige tu Plantilla Base</h2>
        
        {/* Category Tabs */}
        <div className="category-tabs" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.5rem 1.5rem',
                borderRadius: '50px',
                background: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.1)',
                color: activeCategory === cat ? '#000' : '#fff',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="gallery-content">
          <div className="theme-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
            {filteredThemes.map(theme => (
              <div key={theme.id} className="theme-card" onClick={() => onSelectTheme(theme.id)}>
                <LiveThumbnail themeId={theme.id} />
                <div className="theme-overlay">
                  <button className="btn-select">Usar Plantilla</button>
                </div>
                <div className="theme-info">
                  <h3>{theme.name}</h3>
                  <span className="theme-badge">Interactive</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AdSense Banner */}
      <AdBanner slotId="gallery_bottom" />

      {/* Tip Jar Floating Button */}
      <button 
        className="btn-floating-tip" 
        onClick={() => setShowTipJar(true)}
      >
        ☕ Apóyanos
      </button>

      {showTipJar && <TipJarModal onClose={() => setShowTipJar(false)} />}

      {/* Footer */}
      <footer className="site-footer">
        <p>Hecho con ❤️ usando React y CSS puro. Zero base de datos.</p>
        <div className="footer-links">
          <a href="#">Términos</a>
          <a href="#">Privacidad</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowTipJar(true); }}>Invítanos un café</a>
        </div>
        <p style={{ marginTop: '0.5rem', opacity: 0.5 }}>PixelHugs © 2026</p>
      </footer>
    </div>
  );
}
