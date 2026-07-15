import React from 'react';
import Viewer from './Viewer';

export default function LiveThumbnail({ themeId }) {
  // We pass dummy data to the Viewer to show a beautiful preview
  const dummyData = {
    themeId: themeId,
    layoutId: 'envelope_3d', // We can force a specific layout for the preview
    toName: 'Persona Especial',
    message: 'Este es un mensaje de ejemplo para que veas cómo lucirá tu increíble dedicatoria. ¡Escribe lo que sientas!',
    fromName: 'Tu Nombre'
  };

  return (
    <div className="theme-preview-container">
      {/* We use CSS transform to scale down the actual 1200x900 view into the small thumbnail container */}
      <div className="live-thumbnail-scaler" style={{ transform: 'scale(0.25)' }}>
        <Viewer data={dummyData} isPreview={true} />
      </div>
    </div>
  );
}
