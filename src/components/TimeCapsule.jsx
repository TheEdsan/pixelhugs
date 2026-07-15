import React, { useState, useEffect } from 'react';

export default function TimeCapsule({ children, data, isPreview = false }) {
  const [isReady, setIsReady] = useState(isPreview);
  const [timeLeft, setTimeLeft] = useState('');
  
  // Future date logic (for demo, if preview it's ready, if live it checks data.unlockDate)
  useEffect(() => {
    if (isPreview) return;
    
    // If no unlock date provided, default to tomorrow
    const unlockDate = data.unlockDate ? new Date(data.unlockDate).getTime() : new Date().getTime() + 86400000;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = unlockDate - now;

      if (diff <= 0) {
        setIsReady(true);
        clearInterval(interval);
      } else {
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${h}h ${m}m ${s}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data.unlockDate, isPreview]);

  if (isReady) {
    return <div className="animate-pop-in">{children}</div>;
  }

  return (
    <div className="capsule-container animate-pulse">
      <div className="capsule-icon">⏳</div>
      <h2>Cápsula del Tiempo</h2>
      <p>Este mensaje está sellado y no puede abrirse todavía.</p>
      <div className="capsule-timer">
        Se abrirá en: <strong>{timeLeft}</strong>
      </div>
    </div>
  );
}
