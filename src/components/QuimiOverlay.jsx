// QuimiOverlay.jsx
import React, { useState, useEffect } from 'react';
import './QuimiOverlay.css';

// Versión simplificada con mensajes contextuales
const QuimiOverlay = ({ tipoJuego, estadoJuego, datos, posicion = "derecha" }) => {
  const [mostrar, setMostrar] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [estadoQuimi, setEstadoQuimi] = useState('normal');

  // Mensajes contextuales basados en palabras clave
  const obtenerMensajeContextual = (preguntaTexto, esCorrecta) => {
    const pregunta = preguntaTexto.toLowerCase();
    
    if (pregunta.includes('número atómico') || pregunta.includes('protones')) {
      return esCorrecta 
        ? "¡Correcto! El número atómico son los protones en el núcleo."
        : "¡El número atómico (Z) corresponde a los protones!";
    }
    else if (pregunta.includes('mendeléyev')) {
      return esCorrecta
        ? "¡Exacto! Mendeléyev es el padre de la tabla periódica."
        : "¡Mendeléyev creó la primera tabla periódica en 1869!";
    }
    else if (pregunta.includes('grupo') || pregunta.includes('período')) {
      return esCorrecta
        ? "¡Muy bien! Conoces la organización de la tabla."
        : "¡Recuerda: grupos son columnas, períodos son filas!";
    }
    else if (pregunta.includes('electronegatividad')) {
      return esCorrecta
        ? "¡Excelente! La electronegatividad aumenta hacia el flúor."
        : "¡La electronegatividad aumenta de izquierda a derecha y de abajo hacia arriba!";
    }
    else if (pregunta.includes('metal') || pregunta.includes('propiedad')) {
      return esCorrecta
        ? "¡Correcto! Conoces las propiedades de los elementos."
        : "¡Los metales son conductores, maleables y dúctiles!";
    }
    else if (pregunta.includes('electrones de valencia')) {
      return esCorrecta
        ? "¡Perfecto! Los electrones de valencia determinan la reactividad."
        : "¡Los electrones de valencia están en la última capa!";
    }
    else if (pregunta.includes('octeto')) {
      return esCorrecta
        ? "¡Bien! Los átomos buscan la configuración de gas noble."
        : "¡La regla del octeto busca estabilidad como los gases nobles!";
    }
    else {
      // Mensaje genérico por defecto
      return esCorrecta
        ? "¡Respuesta correcta! ¡Buen trabajo!"
        : "¡Sigue intentando! Aprenderás con cada intento.";
    }
  };

  useEffect(() => {
    if (!estadoJuego) {
      setMostrar(false);
      return;
    }

    let nuevoMensaje = '';
    let nuevoEstado = 'normal';

    if (tipoJuego === 'quiz') {
      if (estadoJuego === 'correcto' || estadoJuego === 'incorrecto') {
        const esCorrecta = estadoJuego === 'correcto';
        
        // Si tenemos datos de la pregunta, usar mensaje contextual
        if (datos && datos.preguntaActual) {
          nuevoMensaje = obtenerMensajeContextual(datos.preguntaActual.pregunta, esCorrecta);
        } else {
          // Mensaje genérico
          nuevoMensaje = esCorrecta 
            ? "¡Excelente! Respuesta correcta." 
            : "¡Ánimo! Sigue practicando.";
        }
        
        nuevoEstado = esCorrecta ? 'feliz' : 'triste';
      }
    } 
    // También necesitas manejar el caso para 'mezcla' si lo usas
    else if (tipoJuego === 'mezcla') {
      if (estadoJuego === 'exito') {
        nuevoMensaje = "¡Felicidades! Has creado un compuesto correctamente.";
        nuevoEstado = 'alegre';
      } else if (estadoJuego === 'error') {
        nuevoMensaje = "¡Sigue intentando! La química requiere experimentación.";
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
    <div className={`quimi-overlay quimi-${posicion}`}>
      <div className={`quimi-contenedor ${posicion === 'izquierda' ? 'quimi-izquierda' : 'quimi-derecha'}`}>
        {/* Colocamos la burbuja de texto primero */}
        <div className={`quimi-burbuja ${posicion === 'izquierda' ? 'burbuja-izquierda' : 'burbuja-derecha'}`}>
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