import React, { useEffect, useState } from 'react';

const Confeti = ({ cantidad = 50 }) => {
  const [confettis, setConfettis] = useState([]);

  useEffect(() => {
    const colores = ['#ff5733', '#33ff57', '#3357ff', '#f033ff', '#ff33a1', '#33fff0', '#ffd733'];
    const nuevosConfettis = [];
    
    for (let i = 0; i < cantidad; i++) {
      nuevosConfettis.push({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 2,
        size: Math.random() * 10 + 5,
        color: colores[Math.floor(Math.random() * colores.length)],
        duration: Math.random() * 3 + 3
      });
    }
    
    setConfettis(nuevosConfettis);
  }, [cantidad]);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
      {confettis.map(confeti => (
        <div
          key={confeti.id}
          className="confeti"
          style={{
            left: `${confeti.left}%`,
            width: `${confeti.size}px`,
            height: `${confeti.size}px`,
            backgroundColor: confeti.color,
            animationDelay: `${confeti.animationDelay}s`,
            animationDuration: `${confeti.duration}s`
          }}
        />
      ))}
    </div>
  );
};

export default Confeti;