import React, { useRef } from 'react';

export default function HeroCarousel() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const showcaseItems = [
    {
      id: 'envelope_3d',
      title: 'Sobre Mágico 3D',
      desc: 'Una animación clásica al abrir.',
      badge: 'Gratis',
      icon: '✉️',
      color: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
    },
    {
      id: 'scratch_card',
      title: 'Raspa y Gana',
      desc: 'El usuario debe raspar la pantalla para leer.',
      badge: '👑 Premium',
      icon: '🪙',
      color: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)'
    },
    {
      id: 'music_box',
      title: 'Cajita Musical 3D',
      desc: 'Gira y reproduce una melodía mágica.',
      badge: '👑 Premium',
      icon: '🎶',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 'pin_lock',
      title: 'Candado Secreto',
      desc: 'Solo abre con el PIN correcto de 4 dígitos.',
      badge: '👑 Premium',
      icon: '🔒',
      color: 'linear-gradient(135deg, #2af598 0%, #009efd 100%)'
    },
    {
      id: 'mystery_box',
      title: 'Caja Sorpresa',
      desc: 'Toca varias veces para revelar el secreto.',
      badge: '👑 Premium',
      icon: '🎁',
      color: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)'
    }
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
        {showcaseItems.map(item => (
          <div key={item.id} className="carousel-card" style={{ background: item.color }}>
            <div className="card-badge">{item.badge}</div>
            <div className="card-icon">{item.icon}</div>
            <div className="card-info">
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
