import React, { useEffect, useState } from 'react';
import Creator from './components/Creator';
import Viewer from './components/Viewer';
import Gallery from './components/Gallery';
import { decodeData } from './utils/codec';
import './index.css';

function App() {
  const [cardData, setCardData] = useState(null);
  const [selectedThemeId, setSelectedThemeId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('c');
    if (code) {
      const data = decodeData(code);
      if (data) {
        setCardData(data);
      }
    }
  }, []);

  if (cardData) {
    return <Viewer data={cardData} />;
  }

  if (selectedThemeId) {
    return <Creator themeId={selectedThemeId} onBack={() => setSelectedThemeId(null)} />;
  }

  return <Gallery onSelectTheme={setSelectedThemeId} />;
}

export default App;
