import React, { useRef, useState, useEffect } from 'react';

export default function FoggyMirror({ children, isPreview = false }) {
  const canvasRef = useRef(null);
  const [isClean, setIsClean] = useState(isPreview);

  useEffect(() => {
    if (isPreview || isClean) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;

    // Draw fog (semi-transparent white/gray)
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some water drops
    for(let i=0; i<30; i++) {
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.beginPath();
      ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*5+2, 0, Math.PI*2);
      ctx.fill();
    }

    ctx.font = '18px Arial';
    ctx.fillStyle = '#999';
    ctx.textAlign = 'center';
    ctx.fillText('Limpia el espejo...', canvas.width / 2, canvas.height / 2);

    let isDrawing = false;

    const wipe = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, 2 * Math.PI);
      ctx.fill();

      // Check wiped percentage
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let clear = 0;
      for (let i = 0; i < 500; i++) {
        const randIndex = Math.floor(Math.random() * (data.length / 4)) * 4;
        if (data[randIndex + 3] === 0) clear++;
      }
      if (clear > 250) { // roughly 50% wiped
        setIsClean(true);
      }
    };

    const handleStart = (e) => { isDrawing = true; handleMove(e); };
    const handleMove = (e) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      wipe(clientX - rect.left, clientY - rect.top);
    };
    const handleEnd = () => { isDrawing = false; };

    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', handleEnd);
    canvas.addEventListener('touchstart', handleStart, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    canvas.addEventListener('touchend', handleEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseup', handleEnd);
      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchmove', handleMove);
      canvas.removeEventListener('touchend', handleEnd);
    };
  }, [isPreview, isClean]);

  return (
    <div className="foggy-container" style={{ position: 'relative', width: '400px', height: '400px', borderRadius: '10px', overflow: 'hidden' }}>
      <div className="mirror-content" style={{ position: 'absolute', inset: 0, zIndex: 1, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
      {!isClean && (
        <canvas 
          ref={canvasRef} 
          style={{ position: 'absolute', inset: 0, zIndex: 2, cursor: 'grab', filter: 'blur(1px)' }} 
        />
      )}
    </div>
  );
}
