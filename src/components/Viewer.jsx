import React, { useEffect, useState } from 'react';
import { themes } from '../data/templates';

export default function Viewer({ data, isPreview = false }) {
  const [showEmojis, setShowEmojis] = useState([]);
  
  const theme = themes.find(t => t.id === data.themeId) || themes[0];
  const isFullScreen = data.layoutId === 'full_screen';

  useEffect(() => {
    const emojis = Array.from({ length: isPreview ? 10 : 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      animationDuration: (Math.random() * 3 + 4) + 's',
      animationDelay: (Math.random() * 2) + 's',
      fontSize: (Math.random() * 20 + 20) + 'px'
    }));
    setShowEmojis(emojis);
  }, [isPreview]);

  const containerStyle = {
    background: theme.bg,
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    minHeight: isPreview ? '100%' : '100vh',
    height: isPreview ? '100%' : 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: isPreview ? '20px' : '0'
  };

  const cardStyle = {
    background: isFullScreen ? 'transparent' : theme.cardBg,
    padding: isFullScreen ? '1rem' : '2.5rem',
    borderRadius: isFullScreen ? '0' : '20px',
    boxShadow: isFullScreen ? 'none' : '0 20px 40px rgba(0,0,0,0.15)',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
    zIndex: 10,
    backdropFilter: isFullScreen ? 'none' : 'blur(10px)'
  };

  return (
    <div style={containerStyle}>
      {showEmojis.map(e => (
        <div key={e.id} className="floating-emoji" style={{
          left: e.left,
          animationDuration: e.animationDuration,
          animationDelay: e.animationDelay,
          fontSize: e.fontSize
        }}>
          {theme.floatingEmoji}
        </div>
      ))}

      <div style={cardStyle} className="animate-pop-in">
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          Para: {data.toName || '...'}
        </h2>
        
        <p style={{ fontSize: '1.2rem', whiteSpace: 'pre-wrap', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          {data.message || 'Tu hermoso mensaje aparecerá aquí...'}
        </p>

        {data.fromName && (
          <div style={{ fontSize: '1.1rem', fontStyle: 'italic', opacity: 0.9 }}>
            Con cariño,<br/><strong>{data.fromName}</strong>
          </div>
        )}
      </div>

      {!isPreview && (
        <div style={{ position: 'fixed', bottom: '15px', right: '15px', zIndex: 100 }}>
          <a href="/" style={{ 
            background: 'rgba(255,255,255,0.2)', 
            padding: '8px 16px',
            borderRadius: '20px',
            color: theme.textColor, 
            textDecoration: 'none', 
            fontSize: '0.85rem', 
            backdropFilter: 'blur(5px)',
            fontWeight: '600'
          }}>
            ✨ Crear mi propia carta
          </a>
        </div>
      )}
    </div>
  );
}
