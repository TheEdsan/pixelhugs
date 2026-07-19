import React from 'react';
import './TipJar.css'; // We will create this

export default function TipJarModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content tip-jar-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="tip-header">
          <h2>¿Te ayudamos a sacarle una sonrisa? 💖</h2>
          <p>PixelHugs es gratis y lo mantenemos con mucho esfuerzo. Si esta carta te sirvió, puedes invitarnos un café para mantener el servidor vivo.</p>
        </div>

        <div className="tip-options">
          {/* Yape / Plin Section */}
          <div className="tip-card yape-card">
            <h3>Yape o Plin 🇵🇪</h3>
            <div className="qr-placeholder">
              <img src="/qr-placeholder.png" alt="QR Yape" style={{ width: '150px', opacity: 0.5 }} />
              <p className="qr-hint">(Coloca tu QR aquí)</p>
            </div>
            <p className="phone-number">987 654 321</p>
            <p className="name-hint">A nombre de: Creador de PixelHugs</p>
          </div>

          {/* PayPal Section */}
          <div className="tip-card paypal-card">
            <h3>Internacional 🌎</h3>
            <a 
              href="https://paypal.me/tuusuario" 
              target="_blank" 
              rel="noreferrer"
              className="btn-paypal"
            >
              Donar con PayPal
            </a>
            <p className="paypal-hint">Rápido y seguro desde cualquier país.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
