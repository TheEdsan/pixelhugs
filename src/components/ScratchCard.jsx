import React, { useRef, useEffect, useState } from 'react';

export default function ScratchCard({ children, isPreview = false }) {
  const canvasRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);

  useEffect(() => {
    if (isScratched) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 300;

    // Fill silver layer
    ctx.fillStyle = '#c0c0c0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add text on top
    ctx.font = '24px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText('¡Raspa aquí!', canvas.width / 2, canvas.height / 2);

    if (isPreview) return; // Skip interactivity if it's a preview

    let isDrawing = false;

    const scratch = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      ctx.fill();

      // Check scratched percentage (simplified check by picking random pixels)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let clear = 0;
      for (let i = 0; i < 500; i++) {
        const randIndex = Math.floor(Math.random() * (imageData.length / 4)) * 4;
        if (imageData[randIndex + 3] === 0) clear++;
      }
      if (clear > 350) { // If roughly 70% scratched
        setIsScratched(true);
      }
    };

    let demoInterval;
    if (data?.isDemo) {
      let angle = 0;
      demoInterval = setInterval(() => {
        angle += 0.5;
        const x = 200 + Math.cos(angle) * 80;
        const y = 150 + Math.sin(angle * 2) * 50;
        scratch(x, y);
      }, 50);
    }

    const handleStart = (e) => {
      isDrawing = true;
      handleMove(e);
    };

    const handleMove = (e) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      scratch(clientX - rect.left, clientY - rect.top);
    };

    const handleEnd = () => { isDrawing = false; };

    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', handleEnd);
    canvas.addEventListener('touchstart', handleStart, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    canvas.addEventListener('touchend', handleEnd);

    return () => {
      if (demoInterval) clearInterval(demoInterval);
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseup', handleEnd);
      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchmove', handleMove);
      canvas.removeEventListener('touchend', handleEnd);
    };
  }, [isPreview, isScratched]);

  return (
    <div className="scratch-container" style={{ position: 'relative', width: '400px', height: '300px' }}>
      <div className="scratch-content" style={{ position: 'absolute', inset: 0, zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
      {!isScratched && (
        <canvas 
          ref={canvasRef} 
          style={{ position: 'absolute', inset: 0, zIndex: 2, borderRadius: '20px', cursor: 'crosshair', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} 
        />
      )}
    </div>
  );
}
