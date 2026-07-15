import React, { useState } from 'react';

export default function PinLock({ children, data, isPreview = false }) {
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(isPreview);
  const [error, setError] = useState(false);
  const targetPin = data.pinCode || '1234';

  const handleDigit = (digit) => {
    if (input.length < 4) {
      const newVal = input + digit;
      setInput(newVal);
      setError(false);
      
      if (newVal.length === 4) {
        if (newVal === targetPin) {
          setTimeout(() => setUnlocked(true), 500);
        } else {
          setError(true);
          setTimeout(() => setInput(''), 1000);
        }
      }
    }
  };

  const handleDelete = () => {
    setInput(input.slice(0, -1));
    setError(false);
  };

  if (unlocked) {
    return <div className="animate-pop-in">{children}</div>;
  }

  return (
    <div className={`pin-lock-container ${error ? 'shake-error' : ''}`}>
      <h2 className="pin-title">🔒 Mensaje Bloqueado</h2>
      <p className="pin-subtitle">Ingresa el código secreto para leer</p>
      
      <div className="pin-dots">
        {[0,1,2,3].map(i => (
          <div key={i} className={`pin-dot ${input.length > i ? 'filled' : ''} ${error ? 'error' : ''}`}></div>
        ))}
      </div>

      <div className="pin-pad">
        {[1,2,3,4,5,6,7,8,9].map(num => (
          <button key={num} className="pin-btn" onClick={() => handleDigit(num.toString())}>{num}</button>
        ))}
        <button className="pin-btn empty"></button>
        <button className="pin-btn" onClick={() => handleDigit('0')}>0</button>
        <button className="pin-btn delete" onClick={handleDelete}>⌫</button>
      </div>
    </div>
  );
}
