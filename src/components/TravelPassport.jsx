import React from 'react';

export default function TravelPassport({ children, data, isPreview = false }) {
  const today = new Date().toLocaleDateString();

  return (
    <div className="passport-container">
      <div className="passport-book">
        <div className="passport-left">
          <div className="passport-photo-placeholder"></div>
          <div className="passport-details">
            <p><strong>Pasajero:</strong> {data.toName}</p>
            <p><strong>Destino:</strong> Siempre Juntos</p>
            <p><strong>Fecha de Emisión:</strong> {today}</p>
          </div>
          <div className="passport-stamp stamp-1">APROBADO</div>
        </div>
        <div className="passport-right">
          <div className="passport-message">
            {children}
          </div>
          <div className="passport-stamp stamp-2">VIAJE DE IDA</div>
        </div>
      </div>
    </div>
  );
}
