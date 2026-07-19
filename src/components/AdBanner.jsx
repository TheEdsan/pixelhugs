import React, { useEffect } from 'react';

export default function AdBanner({ slotId }) {
  useEffect(() => {
    // Solo inicializa el anuncio si window.adsbygoogle está disponible (AdSense cargado)
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error('Error loading AdSense banner', e);
    }
  }, []);

  return (
    <div style={{ margin: '2rem 0', textAlign: 'center', width: '100%', minHeight: '90px' }}>
      <p style={{ fontSize: '10px', color: '#666', textTransform: 'uppercase', marginBottom: '4px' }}>Publicidad</p>
      
      {/* 
        IMPORTANTE: 
        1. Debes reemplazar 'ca-pub-XXXXXXXXXXXXX' con tu ID de editor de AdSense real.
        2. Debes reemplazar 'data-ad-slot' con el ID del bloque de anuncios real.
      */}
      <ins 
        className="adsbygoogle"
        style={{ display: 'block', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}
        data-ad-client="ca-pub-0000000000000000" 
        data-ad-slot={slotId || "0000000000"}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
