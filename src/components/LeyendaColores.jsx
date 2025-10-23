// LeyendaColores.jsx
import React from 'react';
import './LeyendaColores.css';


const LeyendaColores = ({ categorias = [], categoriaSeleccionada, onCategoriaClick }) => {
  const grupos = [
    { nombre: 'No Metales', clase: 'non-metal' },
    { nombre: 'Metales transición', clase: 'transition-metal' },
    { nombre: 'Metales Alcalinos', clase: 'alkali-metal' },
    { nombre: 'Alcalinotérreos', clase: 'alkaline-earth-metal' },
    { nombre: 'Metaloides', clase: 'metalloid' },
    { nombre: 'Otros metales', clase: 'otros-metales' },
    { nombre: 'Gases nobles', clase: 'noble-gas' },
    { nombre: 'Halógenos', clase: 'halogen' },
    { nombre: 'Lantánidos', clase: 'lantanidos' },
    { nombre: 'Actínidos', clase: 'actinidos' }
  ];

  return (
    <div className="leyenda-posicion">
      <div className="leyenda-contenido">
        <div className="leyenda-fila">
          {categorias.slice(0, 5).map((grupo, index) => (
            <div
              key={`fila1-${index}`}
              className={`leyenda-item ${categoriaSeleccionada === grupo.clase ? 'activo' : ''}`}
              onClick={() => onCategoriaClick(categoriaSeleccionada === grupo.clase ? null : grupo.clase)}
            >
              <div className={`leyenda-color ${grupo.clase}`}>
                <span className="leyenda-texto">{grupo.nombre}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="leyenda-fila">
          {categorias.slice(5).map((grupo, index) => (
            <div
              key={`fila2-${index}`}
              className={`leyenda-item ${categoriaSeleccionada === grupo.clase ? 'activo' : ''}`}
              onClick={() => onCategoriaClick(categoriaSeleccionada === grupo.clase ? null : grupo.clase)}
            >
              <div className={`leyenda-color ${grupo.clase}`}>
                <span className="leyenda-texto">{grupo.nombre}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeyendaColores;