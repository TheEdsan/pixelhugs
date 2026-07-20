const fs = require('fs');

const path = './src/data/templates.js';
let content = fs.readFileSync(path, 'utf8');

const arrayStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
let themes = JSON.parse(arrayStr);

function getLuminance(hex) {
    if (!hex || hex.length < 7) return 0.5; // default
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

themes = themes.map(t => {
    let isDarkBg = false;
    let isLightBg = false;
    
    if (t.cardBg.includes('0, 0, 0') || t.cardBg.includes('10, 10, 10')) isDarkBg = true;
    if (t.cardBg.includes('255, 255, 255') || t.cardBg.includes('250, 250, 250')) isLightBg = true;

    const textLuma = getLuminance(t.textColor);

    if (isDarkBg && textLuma < 0.4) {
        // Dark text on dark background
        t.textColor = '#ffffff';
    } else if (isLightBg && textLuma > 0.6) {
        // Light text on light background
        t.textColor = '#000000';
    }

    return t;
});

const newContent = `export const themes = ${JSON.stringify(themes, null, 2)};`;
fs.writeFileSync(path, newContent, 'utf8');
console.log('Fixed themes contrast!');
