import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { useElementos } from './hooks/useElementos';
import { useTableFit } from './hooks/useTableFit';
import LeyendaColores from './components/LeyendaColores';
import ElementoModal from './components/ElementoModal';
import MobileTable from './components/MobileTable';
import logoMincyt from './assets/logo-mincyt.png';
import Juegos from './components/Juegos';
import munequitaImage from '/imagenes/animacion_bienvenida.png';

function App() {
  const tableRef = useRef(null);
  const tableFits = useTableFit(tableRef);
  const { elementos, loading, error } = useElementos();
  const [selectedElement, setSelectedElement] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [seccionActual, setSeccionActual] = useState('tabla');
  const [resetJuegos, setResetJuegos] = useState(0);
  const [showLoading, setShowLoading] = useState(true);

  // Mapeo de categorías a clases CSS
  const categoryToClass = {
    'alkali-metal': 'alkali-metal',
    'alkaline-earth-metal': 'alkaline-earth-metal',
    'transition-metal': 'transition-metal',
    'post-transition-metal': 'otros-metales',
    'metalloid': 'metalloid',
    'polyatomic-nonmetal': 'non-metal',
    'diatomic-nonmetal': 'halogen',
    'noble-gas': 'noble-gas',
    'lanthanide': 'lantanidos',
    'actinide': 'actinidos',
    'hydrogen': 'non-metal'
  };

  const categorias = [
    { nombre: 'No Metales', clase: 'non-metal' },
    { nombre: 'Metales de transición', clase: 'transition-metal' },
    { nombre: 'Metales Alcalinos', clase: 'alkali-metal' },
    { nombre: 'Metales Alcalinotérreos', clase: 'alkaline-earth-metal' },
    { nombre: 'Metaloides', clase: 'metalloid' },
    { nombre: 'Otros Metales', clase: 'otros-metales' },
    { nombre: 'Gases Nobles', clase: 'noble-gas' },
    { nombre: 'Halógenos', clase: 'halogen' },
    { nombre: 'Lantánidos', clase: 'lantanidos' },
    { nombre: 'Actínidos', clase: 'actinidos' }
  ];

  const shouldShowMobileTable = tableFits === false || isMobile;

  // Efecto para detectar el tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 832);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Efecto FALTANTE - Controlar el temporizador de la pantalla de carga
  useEffect(() => {
    let loadingTimer;
    
    if (loading) {
      // Si todavía está cargando, mantenemos showLoading en true
      setShowLoading(true);
    } else {
      // Cuando termina de cargar, esperamos 6 segundos antes de ocultar la pantalla de carga
      loadingTimer = setTimeout(() => {
        setShowLoading(false);
      }, 6000); // 6000ms = 6 segundos
    }

    return () => {
      if (loadingTimer) {
        clearTimeout(loadingTimer);
      }
    };
  }, [loading]); // Este efecto se ejecuta cuando cambia el estado de loading

  // Función para manejar el clic en Juegos
  const manejarClickJuegos = () => {
    setSeccionActual('juegos');
    setResetJuegos(prev => prev + 1);
  };

  if (showLoading || loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          
          
          <h1 className="loading-text">¡ÚNETE A LA AVENTURA CIENTÍFICA!</h1>
          
          <img 
            src={munequitaImage} 
            alt="Muñequita de aventura" 
            className="munequita-imagen"
          />
          
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      {/* ENCABEZADO FIJO - ESTRUCTURA CONSISTENTE */}
      <header className="app-header">
        <div className="header-fixed-container">
          <div className="header-content">
            <div className="logo-container">
              <img src={logoMincyt} alt="Logo MINCyT" className="logo-mincyt" />
            </div>

            <nav className="menu-principal">
              <button 
                className={`menu-item ${seccionActual === 'tabla' ? 'activo' : ''}`}
                onClick={() => setSeccionActual('tabla')}
              >
                Tabla periódica
              </button>
              <button 
                className={`menu-item ${seccionActual === 'juegos' ? 'activo' : ''}`}
                onClick={manejarClickJuegos}
              >
                Juegos
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL - MISMA ESTRUCTURA PARA AMBAS VISTAS */}
      <div className="app-container">
        <main className="main-content">
          {seccionActual === 'tabla' ? (
            <div className="tabla-section">
              <h1 className="titulo-principal">Tabla Periódica de los Elementos</h1>

              {/* Renderizado condicional de la tabla */}
              {shouldShowMobileTable ? (
                <MobileTable 
                  elementos={elementos} 
                  categoryToClass={categoryToClass}
                  setSelectedElement={setSelectedElement}
                />
              ) : (
                <div className="tabla-container">
                  <div className="tabla-periodica">
                    {elementos.map(elemento => {
                      const categoriaClase = categoryToClass[elemento.category] || '';
                      const estaResaltado = categoriaSeleccionada === categoriaClase;

                      return (
                        <div
                          key={elemento.number}
                          className={`element ${categoriaClase} ${estaResaltado ? 'resaltado' : ''}`}
                          data-name={elemento.name}
                          style={{
                            gridColumn: elemento.xpos,
                            gridRow: elemento.ypos
                          }}
                          onClick={() => setSelectedElement(elemento)}
                        >
                          <div className="elemento-simbolo">{elemento.symbol}</div>
                        </div>
                      );
                    })}

                    {/* Leyenda insertada entre Be, Mg y B, Al */}
                    <div
                      className="leyenda-posicion"
                      style={{ gridColumn: '3 / span 10', gridRow: 2 }}
                    >
                      <LeyendaColores
                        categorias={categorias}
                        categoriaSeleccionada={categoriaSeleccionada}
                        onCategoriaClick={setCategoriaSeleccionada}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Juegos 
              elementos={elementos} 
              key={resetJuegos}
              onVolverATabla={() => setSeccionActual('tabla')}
            />
          )}

          {/* Modal que aparece al seleccionar un elemento */}
          {selectedElement && (
            <ElementoModal 
              elemento={selectedElement} 
              onClose={() => setSelectedElement(null)} 
            />
          )}
        </main>
      </div>

      {/* FOOTER FIJO - ESTRUCTURA CONSISTENTE */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>
            © {new Date().getFullYear()} Tabla Periódica Interactiva - MINCyT Venezuela | 
            Desarrollado por: Maeva Puente | 
            
            <a href="https://mincyt.gob.ve" target="_blank" rel="noopener noreferrer">
               Ministerio del Poder Popular para Ciencia y Tecnología
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;