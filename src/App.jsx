import React, { useEffect, useState } from 'react';
import Creator from './components/Creator';
import Viewer from './components/Viewer';
import { decodeData } from './utils/codec';
import './index.css';

function App() {
  const [cardData, setCardData] = useState(null);

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

  return (
    <>
      {cardData ? <Viewer data={cardData} /> : <Creator />}
    </>
  );
}

export default App;
