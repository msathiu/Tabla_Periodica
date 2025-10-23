import React, { useEffect, useState } from 'react';

const EfectoGrietas = ({ cantidad = 8 }) => {
  const [grietas, setGrietas] = useState([]);

  useEffect(() => {
    const nuevasGrietas = [];
    
    for (let i = 0; i < cantidad; i++) {
      nuevasGrietas.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        rotation: Math.random() * 360,
        width: Math.random() * 30 + 20,
        delay: Math.random() * 0.5
      });
    }
    
    setGrietas(nuevasGrietas);
  }, [cantidad]);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
      {grietas.map(grieta => (
        <div
          key={grieta.id}
          className="grieta"
          style={{
            top: `${grieta.top}%`,
            left: `${grieta.left}%`,
            width: `${grieta.width}%`,
            transform: `rotate(${grieta.rotation}deg)`,
            animationDelay: `${grieta.delay}s`
          }}
        />
      ))}
    </div>
  );
};

export default EfectoGrietas;