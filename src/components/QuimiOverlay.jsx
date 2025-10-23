// QuimiOverlay.jsx
import React, { useState, useEffect } from 'react';
import './QuimiOverlay.css';

const QuimiOverlay = ({ tipoJuego, estadoJuego, datos, posicion = "derecha" }) => {
  const [mostrar, setMostrar] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [estadoQuimi, setEstadoQuimi] = useState('normal');

  // Mensajes específicos para cada pregunta del quiz
  const mensajesQuizCorrecto = [
    "Correcto. Es el sistema de clasificación de los elementos.",
    "Exacto. El número atómico corresponde al número de protones en el núcleo.",
    "Correcto. Mendeléyev creó la tabla periódica moderna.",
    "Muy bien. Los grupos contienen elementos con propiedades similares.",
    "Exacto. Las filas horizontales se llaman períodos.",
    "Correcto. El elemento con 11 protones (sodio), es un metal alcalino del Grupo 1, Periodo 3",
    "Muy bien. Esas son propiedades características de los metales.",
    "Correcto. Los átomos buscan la configuración de un gas noble.",
    "Exacto. La electronegatividad aumenta hacia arriba y a la derecha.",
    "Muy bien. El bromo tiene 7 electrones de valencia."
  ];

  const mensajesQuizIncorrecto = [
    "¡Casi! La tabla solo clasifica elementos químicos.",
    "¡Ánimo! El número atómico se define por los protones.",
    "¡Sigue adelante! Mendeléyev es el padre de la tabla periódica.",
    "¡No te rindas! Las propiedades similares se dan en el grupo.",
    "¡Intenta otra vez! Las filas horizontales son períodos.",
    "¡Ánimo! El sodio está en el Grupo 1, Período 3.",
    "¡Casi lo tienes! Esas son propiedades metálicas.",
    "¡No te desanimes! La regla del octeto sigue a los gases nobles.",
    "¡Sigue practicando! La electronegatividad aumenta hacia el flúor.",
    "¡Ánimo! El bromo tiene 7 electrones de valencia."
  ];

  const mensajesMezcla = {
    exito: [
      "¡Felicidades! Has descubierto un nuevo compuesto.",
      "¡Increíble! Este compuesto es muy importante en la industria.",
      "¡Excelente trabajo! Este compuesto tiene aplicaciones fascinantes."
    ],
    error: [
      "¡Sigue intentando! La química requiere paciencia y experimentación.",
      "¡No te desanimes! Hasta los grandes químicos cometían errores.",
      "¡Intenta otra combinación! La práctica hace al maestro."
    ]
  };

  // Determinar la posición según el tipo de juego
  const obtenerPosicion = () => {
    if (tipoJuego === 'mezcla') {
      return 'izquierda';
    } else if (tipoJuego === 'quiz') {
      return 'derecha';
    }
    return posicion; // Usar la posición por defecto si no coincide
  };

  const posicionActual = obtenerPosicion();

  useEffect(() => {
    // Si no hay estadoJuego, ocultar
    if (!estadoJuego) {
      setMostrar(false);
      return;
    }

    // Determinar mensaje según el tipo de juego y estado
    let nuevoMensaje = '';
    let nuevoEstado = 'normal';

    if (tipoJuego === 'quiz') {
      if (estadoJuego === 'correcto') {
        // Usar índice específico si está disponible en datos, o aleatorio
        const indice = datos?.indicePregunta !== undefined ? datos.indicePregunta : Math.floor(Math.random() * mensajesQuizCorrecto.length);
        nuevoMensaje = mensajesQuizCorrecto[indice % mensajesQuizCorrecto.length];
        nuevoEstado = 'feliz';
      } else if (estadoJuego === 'incorrecto') {
        const indice = datos?.indicePregunta !== undefined ? datos.indicePregunta : Math.floor(Math.random() * mensajesQuizIncorrecto.length);
        nuevoMensaje = mensajesQuizIncorrecto[indice % mensajesQuizIncorrecto.length];
        nuevoEstado = 'triste';
      }
    } else if (tipoJuego === 'mezcla') {
      if (estadoJuego === 'exito') {
        nuevoMensaje = mensajesMezcla.exito[Math.floor(Math.random() * mensajesMezcla.exito.length)];
        if (datos && datos.compuesto) {
          nuevoMensaje += ` ${datos.compuesto.explicacion}`;
        }
        nuevoEstado = 'alegre';
      } else if (estadoJuego === 'error') {
        nuevoMensaje = mensajesMezcla.error[Math.floor(Math.random() * mensajesMezcla.error.length)];
        nuevoEstado = 'triste';
      }
    }

    setMensaje(nuevoMensaje);
    setEstadoQuimi(nuevoEstado);
    setMostrar(true);

    // Ocultar automáticamente después de 7 segundos
    const timer = setTimeout(() => {
      setMostrar(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, [tipoJuego, estadoJuego, datos]);

  if (!mostrar) return null;

  return (
    <div className={`quimi-overlay quimi-${posicionActual}`}>
      <div className={`quimi-contenedor ${posicionActual === 'izquierda' ? 'quimi-izquierda' : 'quimi-derecha'}`}>
        {/* Colocamos la burbuja de texto primero */}
        <div className={`quimi-burbuja ${posicionActual === 'izquierda' ? 'burbuja-izquierda' : 'burbuja-derecha'}`}>
          <p>{mensaje}</p>
        </div>
        {/* Y la imagen de Quimi después */}
        <img 
          src={`/imagenes/animacion_${estadoQuimi}.png`} 
          alt="Quimi" 
          className="quimi-imagen" 
          onError={(e) => {
            e.target.src = '/imagenes/quimi_normal.webp'; // Imagen de respaldo
          }}
        />
      </div>
    </div>
  );
};

export default QuimiOverlay;