import React, { useState } from 'react';
import './MobileTable.css';

const MobileTable = ({ elementos, categoryToClass, setSelectedElement }) => {
  const [grupoAbierto, setGrupoAbierto] = useState(null);

  const grupos = [
    {
      nombre: "Metales Alcalinos",
      clases: ["alkali-metal"],
      icono: "🧪"
    },
    {
      nombre: "Metales Alcalinotérreos",
      clases: ["alkaline-earth-metal"],
      icono: "🔬"
    },
    {
      nombre: "Metales de Transición",
      clases: ["transition-metal"],
      icono: "⚗️"
    },
    {
      nombre: "Otros Metales",
      clases: ["otros-metales"],
      icono: "🧫"
    },
    {
      nombre: "Metaloides",
      clases: ["metalloid"],
      icono: "🧪"
    },
    {
      nombre: "No Metales",
      clases: ["non-metal", "hidrogeno"],
      icono: "🔍"
    },
    {
      nombre: "Halógenos",
      clases: ["halogen"],
      icono: "🧴"
    },
    {
      nombre: "Gases Nobles",
      clases: ["noble-gas"],
      icono: "💨"
    },
    {
      nombre: "Lantánidos",
      clases: ["lantanidos"],
      icono: "⚛️"
    },
    {
      nombre: "Actínidos",
      clases: ["actinidos"],
      icono: "☢️"
    }
  ];

  const toggleGrupo = (nombre) => {
    setGrupoAbierto(grupoAbierto === nombre ? null : nombre);
  };

  // Función para ordenar elementos por número atómico
  const ordenarElementos = (elementos) => {
    return elementos.sort((a, b) => a.number - b.number);
  };

  return (
    <div className="mobile-container">
      {grupos.map((grupo) => {
        const elementosFiltrados = elementos.filter(e => 
          grupo.clases.includes(categoryToClass[e.category] || '')
        );
        
        if (elementosFiltrados.length === 0) return null;
        
        return (
          <div key={grupo.nombre} className="mobile-group">
            <button 
              className={`mobile-group-button ${grupo.clases[0]}`}
              onClick={() => toggleGrupo(grupo.nombre)}
            >
              <span className="mobile-group-icon">{grupo.icono}</span>
              {grupo.nombre}
              <span className="mobile-group-arrow">
                {grupoAbierto === grupo.nombre ? '▲' : '▼'}
              </span>
            </button>
            
            {grupoAbierto === grupo.nombre && (
              <div className="mobile-elements-grid">
                {ordenarElementos(elementosFiltrados).map(elemento => (
                  <div
                    key={elemento.number}
                    className={`mobile-element ${categoryToClass[elemento.category] || ''}`}
                    onClick={() => setSelectedElement(elemento)}
                    data-name={elemento.name}
                  >
                    <div className="element-symbol">{elemento.symbol}</div>
                    <div className="element-number" style={{fontSize: '0.7rem', position: 'absolute', top: '2px', left: '4px'}}>
                      {elemento.number}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MobileTable;