import React, { useRef } from 'react';
import Viewer from './Viewer';

export default function HeroCarousel() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const showcaseItems = [
    { id: 'center_card', title: 'Tarjeta Clásica', desc: 'Sencilla y directa.', badge: 'Gratis' },
    { id: 'envelope_3d', title: 'Sobre Mágico 3D', desc: 'Una animación clásica al abrir.', badge: 'Gratis' },
    { id: 'wrapped_story', title: 'Historia Tap-to-Read', desc: 'Estilo historias de redes sociales.', badge: '👑 Premium' },
    { id: 'mystery_box', title: 'Caja Sorpresa', desc: 'Toca varias veces para revelar el secreto.', badge: '👑 Premium' },
    { id: 'runaway_button', title: 'El Botón Escurridizo', desc: 'Escapa del dedo cada vez que intentan tocarlo.', badge: '👑 Premium' },
    { id: 'scratch_card', title: 'Raspa y Gana', desc: 'Raspa la pantalla para leer.', badge: '👑 Premium' },
    { id: 'love_timer', title: 'Cronómetro de Amor', desc: 'Cuenta el tiempo exacto juntos.', badge: '👑 Premium' },
    { id: 'pin_lock', title: 'Candado Secreto', desc: 'Solo abre con el PIN de 4 dígitos.', badge: '👑 Premium' },
    { id: 'constellation', title: 'Constelación Estelar', desc: 'Dibuja un mensaje en las estrellas.', badge: '👑 Premium' },
    { id: 'music_box', title: 'Cajita Musical 3D', desc: 'Gira y reproduce una melodía mágica.', badge: '👑 Premium' },
    { id: 'sliding_puzzle', title: 'Rompecabezas', desc: 'Desliza las piezas para armar tu mensaje.', badge: '👑 Premium' },
    { id: 'bottle_ocean', title: 'Mensaje en Botella', desc: 'Llega flotando en el océano.', badge: '👑 Premium' },
    { id: 'ghost_typewriter', title: 'Máquina Fantasma', desc: 'Escribe tu mensaje letra por letra.', badge: '👑 Premium' },
    { id: 'travel_passport', title: 'Pasaporte', desc: 'Diseño de sellos internacionales.', badge: '👑 Premium' },
    { id: 'minesweeper', title: 'Buscaminas del Amor', desc: 'Encuentra corazones sin explotar.', badge: '👑 Premium' },
    { id: 'foggy_mirror', title: 'Espejo Empañado', desc: 'Limpia el vapor para leer.', badge: '👑 Premium' },
    { id: 'time_capsule', title: 'Cápsula del Tiempo', desc: 'Se bloquea hasta una fecha futura.', badge: '👑 Premium' },
    { id: 'tarot_reading', title: 'Cartas del Destino', desc: 'Lectura de tarot mágica.', badge: '👑 Premium' },
    { id: 'vip_ticket', title: 'Boleto VIP Dorado', desc: 'Pase exclusivo brillante.', badge: '👑 Premium' }
  ];

  return (
    <div className="hero-carousel-container">
      <div className="carousel-header">
        <h3>Descubre la Magia 🪄</h3>
        <div className="carousel-controls">
          <button onClick={() => scroll('left')}>❮</button>
          <button onClick={() => scroll('right')}>❯</button>
        </div>
      </div>
      
      <div className="carousel-scroll" ref={scrollRef}>
        {showcaseItems.map((item, idx) => {
          // Use alternating themes for variety
          const themesList = ['love_watercolor', 'neon_vibe', 'birthday_minimal', 'festive_women', 'festive_men'];
          const theme = themesList[idx % themesList.length];
          const mockData = {
            layoutId: item.id,
            themeId: theme,
            toName: 'Ejemplo',
            message: '¡Este es un ejemplo de cómo se verá tu increíble mensaje mágico!',
            fromName: 'Creador',
            pinCode: '1234',
            question: '¿Te gusta esto?',
            startDate: '2023-01-01'
          };

          return (
            <div key={item.id} className="carousel-card-live">
              <div className="card-badge">{item.badge}</div>
              
              <div className="live-preview-wrapper">
                <div className="live-preview-content">
                  <Viewer data={mockData} isPreview={false} isEditor={true} />
                </div>
                {/* Overlay to intercept clicks and keep it as a pure preview */}
                <div className="live-preview-overlay"></div>
              </div>

              <div className="card-info-live">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
