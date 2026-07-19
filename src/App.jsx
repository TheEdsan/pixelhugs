import React, { useEffect, useState } from 'react';
import Creator from './components/Creator';
import Viewer from './components/Viewer';
import Gallery from './components/Gallery';
import { decodeData } from './utils/codec';
import './index.css';

function App() {
  const [cardData, setCardData] = useState(null);
  const [selectedThemeId, setSelectedThemeId] = useState(null);
  const [successLink, setSuccessLink] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // Si viene de un pago exitoso de Mercado Pago
    if (params.get('payment_success') === 'true') {
      const pending = localStorage.getItem('pending_card');
      if (pending) {
        setSuccessLink(`${window.location.origin}${window.location.pathname}?c=${pending}`);
        localStorage.removeItem('pending_card');
        return;
      }
    }

    const code = params.get('c');
    if (code) {
      const data = decodeData(code);
      if (data) {
        setCardData(data);
      }
    }
  }, []);

  if (successLink) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#fff', background: '#111', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>¡Pago Exitoso! 👑</h1>
        <p style={{ color: '#a3a3a3', marginBottom: '2rem' }}>Tu Enlace Mágico Premium ha sido generado y está listo para sorprender.</p>
        
        <input type="text" readOnly value={successLink} style={{ width: '100%', maxWidth: '500px', padding: '1.2rem', borderRadius: '12px', background: '#222', color: '#fff', border: '1px solid #333', textAlign: 'center' }} />
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button 
            onClick={() => { navigator.clipboard.writeText(successLink); alert('¡Enlace Copiado!'); }}
            style={{ padding: '1rem 2rem', background: '#fff', color: '#000', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            📋 Copiar Enlace
          </button>
          <a 
            href={successLink} 
            target="_blank" 
            rel="noreferrer"
            style={{ padding: '1rem 2rem', background: '#333', color: '#fff', textDecoration: 'none', borderRadius: '50px', fontWeight: 'bold' }}
          >
            👀 Ver Carta
          </a>
        </div>
      </div>
    );
  }

  if (cardData) {
    return <Viewer data={cardData} />;
  }

  if (selectedThemeId) {
    return <Creator themeId={selectedThemeId} onBack={() => setSelectedThemeId(null)} />;
  }

  return <Gallery onSelectTheme={setSelectedThemeId} />;
}

export default App;
