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
      
      {/* AdSense Block */}
      <ins 
        className="adsbygoogle"
        style={{ display: 'block', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}
        data-ad-client="ca-pub-4206824002362807" 
        data-ad-slot={slotId || "0000000000"}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
