import React, { useState } from 'react';
import { encodeData } from '../utils/codec';
import { themes } from '../data/templates';
import Viewer from './Viewer';

export default function Creator({ themeId, onBack }) {
  const theme = themes.find(t => t.id === themeId) || themes[0];
  
  const [formData, setFormData] = useState({
    toName: '',
    message: '',
    fromName: '',
    themeId: themeId,
    layoutId: 'center_card'
  });

  const [generatedLink, setGeneratedLink] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePreset = (msg) => {
    setFormData({ ...formData, message: msg });
  };

  const handleGenerate = () => {
    if (!formData.toName || !formData.message) return alert('Por favor, ingresa para quién es y el mensaje.');
    const base64 = encodeData(formData);
    const link = `${window.location.origin}${window.location.pathname}?c=${base64}`;
    setGeneratedLink(link);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    alert('¡Enlace copiado! Envíalo por WhatsApp.');
  };

  return (
    <div className="editor-layout">
      <div className="editor-sidebar">
        <button className="btn-back" onClick={onBack}>← Volver a la Galería</button>
        
        <h2>Personaliza tu carta</h2>
        <p className="subtitle">Estilo: {theme.name}</p>

        <div className="form-group">
          <label>¿Para quién es?</label>
          <input type="text" name="toName" value={formData.toName} onChange={handleChange} placeholder="Ej. Mi amor, Mamá, Juan..." maxLength={50} />
        </div>

        <div className="form-group">
          <label>Mensaje Mágico</label>
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Escribe algo bonito aquí..." rows="5" maxLength={1000}></textarea>
          
          <div className="presets-container">
            <p className="presets-title">O elige una sugerencia:</p>
            <div className="presets-list">
              {theme.presets.map((preset, idx) => (
                <button key={idx} className="btn-preset" onClick={() => handlePreset(preset)}>
                  {preset.substring(0, 40)}...
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>¿De parte de quién? (Opcional)</label>
          <input type="text" name="fromName" value={formData.fromName} onChange={handleChange} placeholder="Tu nombre" maxLength={50} />
        </div>

        <div className="form-group">
          <label>Formato Mágico</label>
          <select name="layoutId" value={formData.layoutId} onChange={handleChange}>
            <option value="envelope_3d">Sobre Mágico 3D (Animado)</option>
            <option value="center_card">Tarjeta Clásica (Directa)</option>
          </select>
        </div>

        <button className="btn-primary" onClick={handleGenerate}>✨ Crear Enlace Mágico</button>

        {generatedLink && (
          <div className="result-box">
            <p>¡Tu carta está lista!</p>
            <input type="text" readOnly value={generatedLink} />
            <div className="result-actions">
              <button onClick={copyLink}>Copiar Enlace</button>
              <a href={generatedLink} target="_blank" rel="noreferrer">Ver Completa</a>
            </div>
          </div>
        )}
      </div>
      
      <div className="editor-preview">
        <div className="preview-wrapper">
          <Viewer data={formData} isPreview={true} />
        </div>
      </div>
    </div>
  );
}
