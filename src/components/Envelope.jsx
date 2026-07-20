import React, { useState, useEffect } from 'react';

export default function Envelope({ children, data, isPreview = false }) {
  const [isOpen, setIsOpen] = useState(isPreview);

  useEffect(() => {
    if (data?.isDemo) {
      const interval = setInterval(() => {
        setIsOpen(o => !o);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [data?.isDemo]);

  const handleOpen = () => {
    if (!isPreview && !isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <div className="envelope-container" onClick={handleOpen}>
      <div className={`envelope ${isOpen ? 'open' : ''}`}>
        <div className="env-front"></div>
        <div className="env-flap"></div>
        <div className="env-letter">
          {children}
        </div>
        <div className="env-wax-seal">
          {isOpen ? '' : '💌'}
        </div>
      </div>
    </div>
  );
}
