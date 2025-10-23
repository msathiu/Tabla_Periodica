import React from 'react';
import './Resultados.css';
// Componente de Pantalla Ganador
export const PantallaGanador = ({ puntuacion, totalPreguntas, onReiniciar, onVolver }) => {
  return (
    <div className="resultado-overlay">
      <div className="resultado-modal">
        <div className="confeti-container">
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i} 
              className="confeti" 
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`
              }}
            />
          ))}
        </div>

        <div className="resultado-contenido">
          <div className="trofeo-container">🏆</div>
          <h2 className="titulo-juegos">¡GANADOR!</h2>

          <div className="puntuacion">
            <p>Obtuviste</p>
            <div className="puntuacion-numero">{puntuacion}/{totalPreguntas}</div>
            <p>puntos</p>
          </div>

          <div className="botones">
            <button className="btn-reiniciar" onClick={onReiniciar}>Jugar de nuevo</button>
            <button className="btn-volver" onClick={onVolver}>Volver al menú</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de Pantalla Perdedor
export const PantallaPerdedor = ({ puntuacion, totalPreguntas, onReiniciar, onVolver }) => {
  return (
    <div className="resultado-overlay">
      <div className="resultado-modal">
        <div className="grietas-container">
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i} 
              className="grieta" 
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animationDelay: `${Math.random() * 0.5}s`
              }}
            />
          ))}
        </div>

        <div className="resultado-contenido">
          <span className="emoji-grande">❤️</span>

          <h2 className="titulo-juegos">PERDISTE</h2>

          <div className="puntuacion">
            <p>Solo obtuviste</p>
            <div className="puntuacion-numero">{puntuacion}/{totalPreguntas}</div>
            <p>puntos</p>
          </div>

          <div className="botones">
            <button className="btn-reiniciar" onClick={onReiniciar}>Intentar de nuevo</button>
            <button className="btn-volver" onClick={onVolver}>Volver al menú</button>
          </div>
        </div>
      </div>
    </div>
  );
};
