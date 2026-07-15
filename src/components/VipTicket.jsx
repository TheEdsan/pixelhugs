import React from 'react';

export default function VipTicket({ children, isPreview = false }) {
  return (
    <div className="vip-ticket-container">
      <div className="vip-ticket">
        <div className="ticket-left">
          <div className="ticket-logo">VIP PASS</div>
          <div className="ticket-barcode">|||||||||||||||||||||||||</div>
        </div>
        <div className="ticket-right">
          <div className="ticket-content">
            {children}
          </div>
          <div className="ticket-hologram"></div>
        </div>
        
        {/* Ticket notches */}
        <div className="notch top"></div>
        <div className="notch bottom"></div>
      </div>
    </div>
  );
}
