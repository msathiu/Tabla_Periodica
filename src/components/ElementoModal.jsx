import React from 'react';
import './ElementoModal.css';

const ElementoModal = ({ elemento, onClose }) => {
  if (!elemento) return null;

const categoryToClass = {
  'alkali-metal': 'modal-alkali-metal',
  'alkaline-earth-metal': 'modal-alkaline-earth-metal',
  'transition-metal': 'modal-transition-metal',
  'post-transition-metal': 'modal-otros-metales',
  'metalloid': 'modal-metalloid',
  'polyatomic-nonmetal': 'modal-non-metal',
  'diatomic-nonmetal': 'modal-halogen',
  'noble-gas': 'modal-noble-gas',
  'lanthanide': 'modal-lantanidos',        //  CORREGIDO: 'modal-lantanidos'
  'actinide': 'modal-actinidos',           //  CORREGIDO: 'modal-actinidos'
  'unknown': 'modal-desconocido',
  '': 'modal-desconocido',
  'n/a': 'modal-desconocido'
};

const categoryToSpanish = {
  'alkali-metal': 'Metal alcalino',
  'alkaline-earth-metal': 'Metal alcalinotérreo',
  'transition-metal': 'Metal de transición',
  'post-transition-metal': 'Otros metales',
  'metalloid': 'Metaloide',
  'polyatomic-nonmetal': 'No metal',
  'diatomic-nonmetal': 'No metal',
  'noble-gas': 'Gas noble',
  'lanthanide': 'Lantánido',               //  CORREGIDO: 'Lantánido'
  'actinide': 'Actínido',                  //  CORREGIDO: 'Actínido'
  'unknown': 'Desconocido',
  '': 'Desconocido',
  'n/a': 'Desconocido'
};

  const claseCategoria = categoryToClass[elemento.category?.toLowerCase()] || 'modal-desconocido';

  

  const nombreLimpio = elemento.name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '');

  const imagenElemento = `/imagen_elementos/${nombreLimpio}.webp`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>×</button>

        <div className="modal-body-container">
          <div className="modal-image-container">
            <img 
              src={imagenElemento} 
              alt={elemento.name} 
              className="modal-element-image"
              onError={(e) => {
                e.target.src = '/imagen_elementos/default.webp';
              }}
            />
          </div>

          <div className="modal-info-section">
            <div className="modal-header">
              <h2 className="modal-element-name">{elemento.name}</h2>
              <div className={`modal-category-tag ${claseCategoria}`}>
                {categoryToSpanish[elemento.category?.toLowerCase()] || 'Desconocido'}
              </div>
            </div>
            <p className="modal-summary">{elemento.summary || 'Sin descripción disponible.'}</p>
            <ul className="modal-info-list">
              <li><strong>Masa atómica:</strong> {elemento.atomic_mass || '—'}</li>
              <li><strong>Número atómico:</strong> {elemento.number || '—'}</li>
              <li><strong>Config. electrónica:</strong> {elemento.electronConfiguration || '—'}</li>
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementoModal;