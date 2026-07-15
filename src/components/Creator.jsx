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
            <optgroup label="Básicos">
              <option value="center_card">Tarjeta Clásica (Directa)</option>
              <option value="envelope_3d">Sobre Mágico 3D (Animado)</option>
            </optgroup>
            <optgroup label="Experiencias Virales (TikTok)">
              <option value="wrapped_story">Historia Tap-to-Read (TikTok Vibe)</option>
              <option value="mystery_box">Caja Regalo Sorpresa</option>
              <option value="runaway_button">El Botón Escurridizo (Tramposo)</option>
              <option value="scratch_card">Tarjeta Raspa y Gana</option>
              <option value="love_timer">Cronómetro de Amor</option>
              <option value="pin_lock">Candado Secreto con PIN</option>
            </optgroup>
            <optgroup label="Nuevas Maravillas (Fase 3)">
              <option value="constellation">Constelación Estelar</option>
              <option value="music_box">Cajita Musical 3D</option>
              <option value="sliding_puzzle">Rompecabezas Deslizante</option>
              <option value="bottle_ocean">Mensaje en la Botella</option>
              <option value="ghost_typewriter">Máquina de Escribir Fantasma</option>
              <option value="travel_passport">Pasaporte de Viaje</option>
              <option value="minesweeper">Buscaminas del Amor</option>
              <option value="foggy_mirror">Espejo Empañado</option>
              <option value="time_capsule">Cápsula del Tiempo</option>
              <option value="tarot_reading">Lectura de Cartas del Destino</option>
              <option value="vip_ticket">Boleto VIP Dorado</option>
            </optgroup>
          </select>
        </div>

        {formData.layoutId === 'runaway_button' && (
          <div className="form-group animate-pop-in">
            <label>Pregunta para el botón "No"</label>
            <input type="text" name="question" value={formData.question || ''} onChange={handleChange} placeholder="Ej. ¿Me perdonas?" maxLength={60} />
          </div>
        )}

        {formData.layoutId === 'love_timer' && (
          <div className="form-group animate-pop-in">
            <label>Fecha de Inicio (Aniversario)</label>
            <input type="date" name="startDate" value={formData.startDate || ''} onChange={handleChange} />
          </div>
        )}

        {formData.layoutId === 'pin_lock' && (
          <div className="form-group animate-pop-in">
            <label>Código PIN (4 Dígitos)</label>
            <input type="text" name="pinCode" value={formData.pinCode || ''} onChange={handleChange} placeholder="Ej. 1402" maxLength={4} pattern="\d*" />
          </div>
        )}

        {formData.layoutId === 'time_capsule' && (
          <div className="form-group animate-pop-in">
            <label>Fecha de Apertura (Cápsula)</label>
            <input type="datetime-local" name="unlockDate" value={formData.unlockDate || ''} onChange={handleChange} />
          </div>
        )}

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
        <div className="preview-wrapper" style={{ width: '100%', height: '100%' }}>
          {/* Passing isPreview={false} keeps it interactive. 
              Passing isEditor={true} constrains its layout to 100% instead of 100vh.
              The key forces a complete remount of the component tree whenever data changes. */}
          <Viewer key={JSON.stringify(formData)} data={formData} isPreview={false} isEditor={true} />
        </div>
      </div>
    </div>
  );
}
