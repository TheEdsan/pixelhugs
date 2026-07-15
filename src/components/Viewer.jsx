import React, { useEffect, useState } from 'react';
import { themes } from '../data/templates';

export default function Viewer({ data }) {
  const [showEmojis, setShowEmojis] = useState([]);
  
  const theme = themes.find(t => t.id === data.themeId) || themes[0];
  const isFullScreen = data.layoutId === 'full_screen';

  // Generate floating emojis effect
  useEffect(() => {
    const emojis = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      animationDuration: (Math.random() * 3 + 4) + 's',
      animationDelay: (Math.random() * 2) + 's',
      fontSize: (Math.random() * 20 + 20) + 'px'
    }));
    setShowEmojis(emojis);
  }, []);

  const containerStyle = {
    background: theme.bg,
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden'
  };

  const cardStyle = {
    background: isFullScreen ? 'transparent' : theme.cardBg,
    padding: isFullScreen ? '1rem' : '3rem',
    borderRadius: isFullScreen ? '0' : '20px',
    boxShadow: isFullScreen ? 'none' : '0 20px 40px rgba(0,0,0,0.2)',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
    zIndex: 10,
    backdropFilter: isFullScreen ? 'none' : 'blur(10px)'
  };

  return (
    <div style={containerStyle}>
      {/* Floating animations */}
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
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>
          Para: {data.toName}
        </h2>
        
        <p style={{ fontSize: '1.25rem', whiteSpace: 'pre-wrap', lineHeight: '1.8', marginBottom: '2rem' }}>
          {data.message}
        </p>

        {data.fromName && (
          <div style={{ fontSize: '1.2rem', fontStyle: 'italic', opacity: 0.9 }}>
            Con cariño,<br/><strong>{data.fromName}</strong>
          </div>
        )}
      </div>

      <div style={{ position: 'fixed', bottom: '10px', right: '10px', zIndex: 100 }}>
        <a href="/" style={{ color: theme.textColor, textDecoration: 'underline', fontSize: '0.8rem', opacity: 0.7 }}>
          Crear mi propia carta
        </a>
      </div>
    </div>
  );
}
