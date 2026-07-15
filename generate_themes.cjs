const fs = require('fs');
const path = require('path');

const categories = [
  'Amor ❤️',
  'Amistad 🤝',
  'Cumpleaños 🎂',
  'Para Ella ✨',
  'Para Él 🥂'
];

const styles = ['Elegante', 'Divertido', 'Moderno', 'Retro', 'Minimalista', 'Artístico', 'Neón', 'Oscuro', 'Pastel', 'Naturaleza'];

const fonts = [
  '"Georgia", serif',
  '"Playfair Display", serif',
  '"Inter", sans-serif',
  '"Outfit", sans-serif',
  '"Comic Sans MS", cursive',
  'monospace',
  '"Times New Roman", serif',
  '"Arial", sans-serif',
  '"Courier New", monospace',
  '"Impact", sans-serif'
];

const emojis = {
  'Amor ❤️': ['❤️', '💕', '💘', '💖', '🥰', '😍', '🌹', '💋', '💍', '💌', '🫶', '🔥', '✨', '🧸', '🍓', '🍒', '🍷', '🥂', '🦢', '🎀'],
  'Amistad 🤝': ['🤝', '✌️', '🤪', '😎', '🍻', '🍕', '🎮', '🚀', '🌟', '🌻', '⚡', '🔥', '🎈', '🎉', '💪', '👽', '👻', '🤠', '🤩', '🤙'],
  'Cumpleaños 🎂': ['🎂', '🎈', '🎉', '🎁', '🥳', '🎊', '🍰', '🧁', '🍾', '🥂', '👑', '🌟', '✨', '🔥', '💯', '🙌', '🦄', '🌈', '🍭', '🍹'],
  'Para Ella ✨': ['✨', '🌸', '🦋', '💅', '👸', '👑', '💎', '💄', '👛', '👠', '🍷', '🥂', '🌷', '🌹', '🌺', '💖', '🥰', '🌙', '⭐', '🎀'],
  'Para Él 🥂': ['🥂', '💼', '👔', '⌚', '💪', '🏋️‍♂️', '🏎️', '🎮', '🍺', '🥃', '😎', '👑', '🔥', '⚡', '🚀', '🛠️', '⚽', '🏀', '🎸', '🏍️']
};

const bgGradients = [
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'radial-gradient(circle at top right, #310e68 0%, #5f0f40 100%)',
  'linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)',
  '#09090b',
  'linear-gradient(to right, #f6d365 0%, #fda085 100%)',
  'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)',
  '#451a03',
  '#f8fafc',
  'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
  '#000000',
  'radial-gradient(circle, #2e1065 0%, #000000 100%)',
  'linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(to top, #c471f5 0%, #fa71cd 100%)',
  '#fdf4ff',
  'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
  '#1e293b',
  'linear-gradient(135deg, #78350f 0%, #451a03 100%)',
  '#064e3b',
  'linear-gradient(to right, #9ca3af 0%, #4b5563 100%)',
  'linear-gradient(45deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
  'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
  'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
  'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  'linear-gradient(to right, #434343 0%, #000000 100%)',
  'linear-gradient(to top, #09203f 0%, #537895 100%)',
  'linear-gradient(to top, #0ba360 0%, #3cba92 100%)',
  'linear-gradient(to right, #ff758c 0%, #ff7eb3 100%)',
  'linear-gradient(to right, #868f96 0%, #596164 100%)',
  'linear-gradient(to right, #b224ef 0%, #7579ff 100%)',
  'linear-gradient(to right, #f83600 0%, #f9d423 100%)'
];

const textColors = ['#ffffff', '#000000', '#fbbf24', '#f0abfc', '#34d399', '#fef3c7', '#0f172a', '#064e3b', '#c084fc', '#7f1d1d', '#4c1d95', '#9d174d', '#1e3a8a', '#fcd34d', '#111827', '#fee2e2', '#ffb3c6', '#831843', '#78350f'];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const themes = [];
let idCounter = 1;

categories.forEach(category => {
  for (let i = 0; i < 20; i++) {
    const style = getRandom(styles);
    const bg = getRandom(bgGradients);
    const textColor = getRandom(textColors);
    const cardBg = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
    const font = getRandom(fonts);
    const emoji = emojis[category][i % emojis[category].length];

    themes.push({
      id: `theme_${idCounter++}`,
      name: `${style} ${i + 1}`,
      category: category,
      bg: bg,
      textColor: textColor,
      cardBg: cardBg,
      fontFamily: font,
      floatingEmoji: emoji,
      presets: [
        "Un mensaje de ejemplo lleno de buena vibra y energía positiva para ti.",
        "Este es un diseño generado dinámicamente para darte más opciones de personalización.",
        "¡Recuerda que puedes cambiar este texto en el creador por lo que tú quieras!"
      ]
    });
  }
});

const fileContent = `export const themes = ${JSON.stringify(themes, null, 2)};

export const layouts = [
  { id: 'envelope_3d', name: 'Sobre Mágico 3D' },
  { id: 'wrapped_story', name: 'Historia Tap-to-Read (TikTok)' },
  { id: 'mystery_box', name: 'Caja Regalo Sorpresa' },
  { id: 'vip_ticket', name: 'Boleto VIP Dorado' },
  { id: 'runaway_button', name: 'El Botón Escurridizo' },
  { id: 'scratch_card', name: 'Tarjeta Raspa y Gana' },
  { id: 'love_timer', name: 'Cronómetro de Amor' },
  { id: 'pin_lock', name: 'Candado Secreto con PIN' },
  { id: 'constellation', name: 'Constelación Estelar' },
  { id: 'music_box', name: 'Cajita Musical 3D' },
  { id: 'sliding_puzzle', name: 'Rompecabezas Deslizante' },
  { id: 'bottle_ocean', name: 'Mensaje en la Botella' },
  { id: 'ghost_typewriter', name: 'Máquina de Escribir Fantasma' },
  { id: 'travel_passport', name: 'Pasaporte de Viaje' },
  { id: 'minesweeper', name: 'Buscaminas del Amor' },
  { id: 'foggy_mirror', name: 'Espejo Empañado' },
  { id: 'time_capsule', name: 'Cápsula del Tiempo' },
  { id: 'tarot_reading', name: 'Lectura de Cartas del Destino' },
  { id: 'center_card', name: 'Tarjeta Clásica' }
];
`;

fs.writeFileSync(path.join(__dirname, 'src', 'data', 'templates.js'), fileContent);
console.log('Successfully generated 100 templates!');
