import React, { useState } from 'react';
import { encodeData } from '../utils/codec';
import { themes, layouts } from '../data/templates';

export default function Creator() {
  const [formData, setFormData] = useState({
    toName: '',
    message: '',
    fromName: '',
    themeId: themes[0].id,
    layoutId: layouts[0].id
  });

  const [generatedLink, setGeneratedLink] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = () => {
    if (!formData.toName || !formData.message) return alert('Completa los campos principales');
    const base64 = encodeData(formData);
    const link = `${window.location.origin}${window.location.pathname}?c=${base64}`;
    setGeneratedLink(link);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    alert('¡Enlace copiado! Envíalo por WhatsApp.');
  };

  return (
    <div className="creator-container">
      <header className="creator-header">
        <h1>PixelHugs 🎁</h1>
        <p>Crea cartas virtuales mágicas y compártelas al instante. ¡Totalmente gratis!</p>
      </header>

      <div className="creator-form">
        <div className="form-group">
          <label>¿Para quién es?</label>
          <input type="text" name="toName" value={formData.toName} onChange={handleChange} placeholder="Ej. Mi amor, Mamá, Juan..." maxLength={50} />
        </div>

        <div className="form-group">
          <label>Tu Mensaje Especial</label>
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Escribe algo bonito aquí..." rows="4" maxLength={1000}></textarea>
        </div>

        <div className="form-group">
          <label>¿De parte de quién?</label>
          <input type="text" name="fromName" value={formData.fromName} onChange={handleChange} placeholder="Tu nombre" maxLength={50} />
        </div>

        <div className="form-group row">
          <div className="half">
            <label>Elige un Tema</label>
            <select name="themeId" value={formData.themeId} onChange={handleChange}>
              {themes.map(t => (
                <option key={t.id} value={t.id}>{t.name} {t.floatingEmoji}</option>
              ))}
            </select>
          </div>
          <div className="half">
            <label>Formato Visual</label>
            <select name="layoutId" value={formData.layoutId} onChange={handleChange}>
              {layouts.map(l => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
          </div>
        </div>

        <button className="btn-primary" onClick={handleGenerate}>✨ Generar Enlace Mágico</button>

        {generatedLink && (
          <div className="result-box">
            <p>¡Tu carta está lista!</p>
            <input type="text" readOnly value={generatedLink} />
            <div className="result-actions">
              <button onClick={copyLink}>Copiar Enlace</button>
              <a href={generatedLink} target="_blank" rel="noreferrer">Vista Previa</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
