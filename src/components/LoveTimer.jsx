import React, { useState, useEffect } from 'react';

export default function LoveTimer({ children, data }) {
  const [time, setTime] = useState({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
  const startDateStr = data.startDate || new Date().toISOString();

  useEffect(() => {
    const start = new Date(startDateStr).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTime({ years, days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [startDateStr]);

  return (
    <div className="timer-layout animate-pop-in">
      <div className="timer-message">
        {children}
      </div>
      <div className="timer-display">
        {time.years > 0 && <div className="time-block"><span>{time.years}</span><small>Años</small></div>}
        <div className="time-block"><span>{time.days}</span><small>Días</small></div>
        <div className="time-block"><span>{time.hours}</span><small>Horas</small></div>
        <div className="time-block"><span>{time.minutes}</span><small>Min</small></div>
        <div className="time-block"><span>{time.seconds}</span><small>Seg</small></div>
      </div>
    </div>
  );
}
