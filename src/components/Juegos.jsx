import React, { useState, useEffect } from 'react';
import './Juegos.css';
import { PantallaGanador, PantallaPerdedor } from './Resultados';
import QuimiOverlay from './QuimiOverlay';
import useCompuestos from '../hooks/useCompuestos';
// Confeti component
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

// EfectoGrietas component
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

// COMPONENTE PRINCIPAL JUEGOS - VERSIÓN CORREGIDA
const Juegos = ({ elementos, onVolverATabla }) => {
  const [juegoActual, setJuegoActual] = useState(null);

  const juegosDisponibles = [
    { 
      id: 1, 
      nombre: "Conociendo la tabla periódica", 
      descripcion: "Pon a prueba tus conocimientos sobre química",
      componente: QuizTablaPeriodica,
      imagen: "/imagenes/quiz.png"
    },
    { 
      id: 2, 
      nombre: "Mezcla de elementos", 
      descripcion: "Combina elementos para descubrir compuestos",
      componente: MezclaElementos,
      imagen: "/imagenes/mezcla.png"
    }
  ];

  const JuegoComponente = juegoActual ? juegoActual.componente : null;

  // Function to return to game selection
  const volverAJuegos = () => {
    setJuegoActual(null);
  };

  // Function to return to the periodic table
  const volverATabla = () => {
    if (onVolverATabla) {
      onVolverATabla();
    }
  };

  return (
    <div className="app-container">
      <div className="seccion-juegos">
        {!juegoActual ? (
          <>
            <h2 className="titulo-juegos">Juegos educativos</h2>
            <div className="contenedor-seleccion-juegos">
              <div className="lista-juegos-izquierda">
                {juegosDisponibles.map(juego => (
                  <div 
                    key={juego.id} 
                    className="tarjeta-juego"
                    onClick={() => setJuegoActual(juego)}
                  >
                    <img 
                      src={juego.imagen} 
                      alt={juego.nombre} 
                      className="imagen-juego"
                      onError={(e) => {
                        e.target.src = '/imagenes/placeholder.png';
                      }}
                    />
                    <h3>{juego.nombre}</h3>
                    <p>{juego.descripcion}</p>
                    <button className="btn-jugar">Jugar</button>
                  </div>
                ))}
                
                
              </div>
              <div className="panel-invitacion-derecha">
                <div className="quimi-invitacion">
                  <img 
                    src="/imagenes/animacion_inicio.png" 
                    style={{ width: "400px", height: "auto" }}
                    alt="Quimi" 
                    className="imagen-quimi-invitacion"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = document.querySelector('.mensaje-quimi-fallback');
                      if (fallback) fallback.style.display = 'block';
                    }}
                  />
                  <div className="mensaje-quimi-fallback" style={{display: 'none'}}>
                    <div className="quimi-texto"> Quimi</div>
                  </div>
                  
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="juego-activo">
            <h2 className="titulo-juegos">{juegoActual.nombre}</h2>
            <div className="contenedor-juego">
              {JuegoComponente && 
                <JuegoComponente 
                  elementos={elementos} 
                  onVolverAJuegos={volverAJuegos}
                  onVolverATabla={volverATabla}
                />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
// ================== Quiz de la Tabla Periódica (Modified) ==================
const QuizTablaPeriodica = ({ elementos, onVolverAJuegos, onVolverATabla }) => {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [vidas, setVidas] = useState(3);
  const [tiempoRestante, setTiempoRestante] = useState(15);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);
  const [estadoQuimi, setEstadoQuimi] = useState('');
  const [datosQuimi, setDatosQuimi] = useState(null);


const preguntas = [
    {
      pregunta: "¿Cuál de las siguientes afirmaciones describe mejor la tabla periódica de los elementos?",
      opciones: [
        "Es un mapa de organización de los elementos químicos según sus propiedades.",
        "Es una colección de rocas similares.",
        "Es una lista de todos los animales que existen.",
        "Es un documento de listas de planetas del Sistema Solar."
      ],
      respuestaCorrecta: 0,
      explicacion: "La tabla periódica organiza a los elementos químicos de manera sistemática y lógica, lo que la convierte en una herramienta fundamental en la química."
    },
    {
      pregunta: "¿Qué nos indica el 'número atómico' de un elemento?",
      opciones: [
        "La cantidad de electrones que tiene ese átomo.",
        "La cantidad de neutrones del núcleo.",
        "La masa total del elemento.",
        "La cantidad de protones de un núcleo."
      ],
      respuestaCorrecta: 3,
      explicacion: "El número atómico (Z) es el número de protones en el núcleo de un átomo. Es lo que define a un elemento."
    },
    {
      pregunta: "¿Quién es considerado el 'padre' de la tabla periódica?",
      opciones: ["Marie Curie", "Dmitri Mendeléyev", "Niels Bohr", "Antoine Lavoisier"],
      respuestaCorrecta: 1,
      explicacion: "Dmitri Mendeléyev fue quien organizó los elementos en la primera tabla periódica en 1869, prediciendo las propiedades de los elementos que aún no se habían descubierto."
    },
    {
      pregunta: "Los elementos que tienen propiedades químicas similares se encuentran en el mismo...",
      opciones: ["período", "nivel de energía", "grupo", "bloque s, p, d o f"],
      respuestaCorrecta: 2,
      explicacion: "Los grupos, que son las columnas verticales de la tabla periódica, agrupan a elementos con propiedades químicas similares."
    },
    {
      pregunta: "Las filas horizontales de la tabla periódica se conocen como...",
      opciones: ["período", "grupos", "familias", "series"],
      respuestaCorrecta: 0,
      explicacion: "Las filas horizontales en la tabla periódica se llaman períodos. "
    },
    {
      pregunta: "Un elemento con 11 protones en su núcleo es un metal alcalino perteneciente al grupo y período:",
      opciones: [
        "Grupo 1, Período 3",
        "Grupo 1, Período 2",
        "Grupo 3, Período 1",
        "Grupo 11, Período 1"
      ],
      respuestaCorrecta: 0,
      explicacion: "El elemento con 11 protones es el Sodio (Na), que se ubica en el Grupo 1 y Período 3 de la tabla periódica."
    },
    {
      pregunta: "Los elementos que son buenos conductores de calor y electricidad, además de ser maleables y dúctiles, son conocidos como:",
      opciones: [
        "No metales",
        "Gases nobles",
        "Metaloides",
        "Metales"
      ],
      respuestaCorrecta: 3,
      explicacion: "Estas propiedades, como la conductividad y la maleabilidad, son características distintivas de los metales, que se encuentran mayormente al lado izquierdo y centro de la tabla."
    },
    {
      pregunta: "La regla del octeto establece que los átomos tienden a ganar, perder o compartir electrones para tener la misma configuración electrónica que:",
      opciones: [
        "Un halógeno",
        "Un gas noble",
        "Un metaloide",
        "Un metal alcalino"
      ],
      respuestaCorrecta: 1,
      explicacion: "Los átomos buscan alcanzar la estabilidad de un gas noble, que tiene 8 electrones en su capa de valencia (excepto el Helio que tiene 2)."
    },
    {
      pregunta: "En la tabla periódica, ¿cómo varía la electronegatividad de los elementos?",
      opciones: [
        "Aumenta de izquierda a derecha en un período y disminuye de arriba abajo en un grupo.",
        "Aumenta de izquierda a derecha en un período y de arriba abajo en un grupo.",
        "Disminuye de izquierda a derecha en un período y de arriba abajo en un grupo.",
        "Disminuye de izquierda a derecha en un período y aumenta de arriba abajo."
      ],
      respuestaCorrecta: 0,
      explicacion: "La electronegatividad es la capacidad de un átomo para atraer electrones. Por ello, aumenta a medida que nos acercamos al flúor (el elemento más electronegativo) y disminuye a medida que nos alejamos de él."
    },
    {
      pregunta: "Según la configuración electrónica, ¿cuántos electrones de valencia tiene un átomo de Bromo (Br)?",
      opciones: [
        "5",
        "7",
        "17",
        "35"
      ],
      respuestaCorrecta: 1,
      explicacion: "El bromo pertenece al grupo de los halógenos (Grupo 17), por lo que tiene 7 electrones de valencia. "
    }
  ];  
  


// Reemplaza completamente la función manejarRespuesta en el Quiz:
const manejarRespuesta = (opcionIndex) => {
  if (respuestaSeleccionada !== null) return;
  
  setRespuestaSeleccionada(opcionIndex);
  
  // Mostrar si la respuesta es correcta o incorrecta
  const esCorrecta = opcionIndex === preguntas[preguntaActual].respuestaCorrecta;
  if (esCorrecta) {
    setPuntuacion(puntuacion + 1);
    setEstadoQuimi('correcto');
  } else {
    setVidas(vidas - 1);
    setEstadoQuimi('incorrecto');
  }
  
  // Mostrar la explicación después de 1 segundo
  setTimeout(() => {
    setMostrarExplicacion(true);
    
 
   
    
    // Avanzar a la siguiente pregunta después de 5 segundos en total
    setTimeout(() => {
      setMostrarExplicacion(false);
      setRespuestaSeleccionada(null);
      setEstadoQuimi(''); // Resetear estado de Quimi
      
      if (vidas <= 1 || preguntaActual + 1 >= preguntas.length) {
        setJuegoTerminado(true);
      } else {
        setPreguntaActual(preguntaActual + 1);
        setTiempoRestante(15);
      }
    }, 5000);
  }, 1000);
};

  // Temporizador
  useEffect(() => {
    if (juegoTerminado) return;
    
    const temporizador = setInterval(() => {
      if (tiempoRestante > 0) {
        setTiempoRestante(tiempoRestante - 1);
      } else {
        manejarRespuesta(-1); // tiempo agotado
      }
    }, 1000);

    return () => clearInterval(temporizador);
  }, [tiempoRestante, juegoTerminado]);

  

  const reiniciarQuiz = () => {
    setPreguntaActual(0);
    setPuntuacion(0);
    setVidas(3);
    setTiempoRestante(15);
    setJuegoTerminado(false);
    setRespuestaSeleccionada(null);
    setMostrarExplicacion(false);
  };
  
  if (juegoTerminado) {
    const esGanador = puntuacion >= 7;

    return (
      <div className="quiz-contenedor-resultado">
        {esGanador ? <Confeti cantidad={50} /> : <EfectoGrietas cantidad={8} />}
        
        <div className="resultado-contenedor">
          {esGanador ? (
            <div className="contenido-ganador">

              <div className="mensaje-quimi-burbuja">
                <h4>¡Felicidades!</h4>
                <p>
                  Obtuviste {puntuacion}/{preguntas.length} puntos
                </p>
              </div>
              <img 
                src="/imagenes/animacion_ganador.png" 
                alt="Quimi animando" 
                className="quimi-resultado"
              />

              {/* Botones */}
              <div className="botones-resultado">
                <button className="btn-volver-juegos" onClick={reiniciarQuiz}>
                  Intentar de nuevo
                </button>
                <button className="btn-volver-juegos" onClick={onVolverAJuegos}>
                  Volver a juegos
                </button>
              </div>
          
            </div>
          ) : (
            <div className="contenido-perdedor">
             
              <div className="mensaje-quimi-burbuja">
                <h4>¡No te rindas!</h4>
                <p>
                  Solo obtuviste {puntuacion}/{preguntas.length} puntos,<br />
                  pero la próxima te irá mejor 💪
                </p>
              </div>
              <img 
                src="/imagenes/animacion_perdedor.png" 
                alt="Quimi animando" 
                className="quimi-resultado"
              />

              {/* Botones */}
              <div className="botones-resultado">
                <button className="btn-volver-juegos" onClick={reiniciarQuiz}>
                  Intentar de nuevo
                </button>
                <button className="btn-volver-juegos" onClick={onVolverAJuegos}>
                  Volver a juegos
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );

  }
return (
    <div className="quiz-contenedor-rediseno">
      {/* Quiz Header */}
      <div className="quiz-header-rediseno">
        <div className="quiz-marcador">
          <div className="quiz-pregunta-indicador">
            Pregunta {preguntaActual + 1} <span>de {preguntas.length}</span>
          </div>
          <div className="quiz-puntuacion">
            <span className="icono-puntuacion">⚛</span>
            {puntuacion}
          </div>
        </div>
        
        <div className="quiz-info-adicional">
          <div className="quiz-vidas-rediseno">
            {[...Array(3)].map((_, i) => (
              <span 
                key={i} 
                className={`corazon-vida ${i < vidas ? 'lleno' : 'vacio'}`}
              >
                ❤️
              </span>
            ))}
          </div>
          
          <div className="quiz-tiempo-rediseno">
            <div className="tiempo-texto">
              <span className="icono-tiempo">⏱️</span>
              {tiempoRestante}s
            </div>
            <div className="barra-tiempo">
              <div 
                className="progreso-tiempo" 
                style={{width: `${(tiempoRestante / 15) * 100}%`}}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Current Question */}
      <div className="quiz-pregunta-rediseno">
        <div className="numero-pregunta">Pregunta {preguntaActual + 1}</div>
        <h4>{preguntas[preguntaActual].pregunta}</h4>
      </div>
      
      {/* Answer Options */}
      <div className="quiz-opciones-rediseno">
        {preguntas[preguntaActual].opciones.map((opcion, index) => {
          let estado = '';
          if (respuestaSeleccionada !== null) {
            // Solo mostrar si la opción actual es la seleccionada
            if (index === respuestaSeleccionada) {
              // Verificar si la selección es correcta o incorrecta
              if (index === preguntas[preguntaActual].respuestaCorrecta) {
                estado = 'correcta';
              } else {
                estado = 'incorrecta';
              }
            }
            // NO mostrar la respuesta correcta cuando se selecciona una incorrecta
          }
          
          return (
            <button
              key={index}
              className={`btn-opcion-rediseno ${estado} ${respuestaSeleccionada === index ? 'seleccionada' : ''}`}
              onClick={() => manejarRespuesta(index)}
              disabled={respuestaSeleccionada !== null}
            >
              <span className="letra-opcion">{String.fromCharCode(65 + index)}</span>
              <span className="texto-opcion">{opcion}</span>
              {estado === 'correcta' && <span className="icono-resultado">✓</span>}
              {estado === 'incorrecta' && <span className="icono-resultado">✗</span>}
            </button>
          );
        })}
      </div>
      
      {mostrarExplicacion && (
        <div className="quiz-explicacion-rediseno">
          <div className="explicacion-contenido">
            <h5>Explicación:</h5>
            <p>{preguntas[preguntaActual].explicacion}</p>
          </div>
        </div>
      )}

      <QuimiOverlay 
        tipoJuego="quiz" 
        estadoJuego={estadoQuimi} 
        datos={{ indicePregunta: preguntaActual }}
        posicion="derecha"
      />
    </div>
  );
};
// ================== Mezcla de Elementos ==================
const MezclaElementos = ({ elementos, onVolverAJuegos, onVolverATabla }) => {
  const [categoriaActiva, setCategoriaActiva] = useState('binarios');
  const [elementosSeleccionados, setElementosSeleccionados] = useState([]);
  const [resultado, setResultado] = useState('');
  const [puntuacionMezcla, setPuntuacionMezcla] = useState(0);
  const [intentos, setIntentos] = useState(0);
  const [juegoTerminadoMezcla, setJuegoTerminadoMezcla] = useState(false);
  const [compuestosDescubiertos, setCompuestosDescubiertos] = useState([]);
  const [estadoQuimi, setEstadoQuimi] = useState('');
  const [datosQuimi, setDatosQuimi] = useState(null);
  const [mezclaRealizada, setMezclaRealizada] = useState(false); // Nuevo estado


// Compuestos organizados por categorías - VERSIÓN AMPLIADA
const { compuestos, cargando, error } = useCompuestos();


  // Get number of elements based on category
  const getNumeroElementos = () => {
    switch(categoriaActiva) {
      case 'binarios': return 2;
      case 'ternarios': return 3;
      case 'cuaternarios': return 4;
      default: return 2;
    }
  };

  const manejarSeleccionElemento = (index, elemento) => {
    const nuevosElementos = [...elementosSeleccionados];
    nuevosElementos[index] = elemento;
    setElementosSeleccionados(nuevosElementos);
  };

const manejarMezcla = () => {
  if (cargando) {
    setResultado({
      tipo: 'error',
      mensaje: 'Cargando compuestos...'
    });
    return;
  }

  if (elementosSeleccionados.some(el => !el)) {
    setResultado({
      tipo: 'error',
      mensaje: '¡Debes seleccionar todos los elementos!'
    });
    return;
  }

  setIntentos(intentos + 1);
  setMezclaRealizada(true);
  
  // Crear clave ordenada alfabéticamente
  const claveBuscada = elementosSeleccionados.map(el => el.name).sort().join(',');
  
  // Buscar en los compuestos (comparando claves ordenadas)
  const compuestosCategoria = compuestos[categoriaActiva];
  let compuestoEncontrado = null;
  let claveEncontrada = null;
  
  for (const claveJSON of Object.keys(compuestosCategoria)) {
    const claveJSONOrdenada = claveJSON.split(',').sort().join(',');
    if (claveJSONOrdenada === claveBuscada) {
      compuestoEncontrado = compuestosCategoria[claveJSON];
      claveEncontrada = claveJSON;
      break;
    }
  }

  if (compuestoEncontrado) {
    if (!compuestosDescubiertos.includes(claveEncontrada)) {
      setPuntuacionMezcla(puntuacionMezcla + 1);
      setCompuestosDescubiertos([...compuestosDescubiertos, claveEncontrada]);
    }
    
    setResultado({
      tipo: 'exito',
      mensaje: `¡Has creado un compuesto ${categoriaActiva === 'binarios' ? 'binario' : categoriaActiva === 'ternarios' ? 'ternario' : 'cuaternario'}!`,
      compuesto: compuestoEncontrado
    });
    
    setEstadoQuimi('exito');
    setDatosQuimi({ compuesto: compuestoEncontrado });
    
    
  } else {
    setEstadoQuimi('error');
    setDatosQuimi(null);
    setResultado({
      tipo: 'error',
      mensaje: 'Estos elementos no forman un compuesto conocido. ¡Intenta con otra combinación!'
    });
  }
};

  const prepararNuevaMezcla = () => {
    setElementosSeleccionados(Array(getNumeroElementos()).fill(null));
    setResultado('');
    setEstadoQuimi('');
    setDatosQuimi(null);
    setMezclaRealizada(false);
  };

  const reiniciarMezcla = () => {
    setElementosSeleccionados(Array(getNumeroElementos()).fill(null));
    setResultado('');
    setEstadoQuimi(''); // Resetear el estado de Quimi
    setDatosQuimi(null); // Resetear los datos de Quimi
  };

  const reiniciarJuegoCompleto = () => {
    setElementosSeleccionados(Array(getNumeroElementos()).fill(null));
    setResultado('');
    setPuntuacionMezcla(0);
    setIntentos(0);
    setJuegoTerminadoMezcla(false);
    setCompuestosDescubiertos([]);
  };

  // Reset selection when category changes
  useEffect(() => {
    setElementosSeleccionados(Array(getNumeroElementos()).fill(null));
    setResultado('');
    setMezclaRealizada(false);
  }, [categoriaActiva]);

  
  return (
    <div className="mezcla-contenedor-rediseno">
      {/* Sidebar de controles (Columna izquierda) */}
      <div className="sidebar-controles">
        <h2 className="titulo-sidebar">Selecciona el tipo de compuesto</h2>
        
        <div className="categorias-mezcla-rediseno">
            <button 
            className={`categoria-card ${categoriaActiva === 'binarios' ? 'activo' : ''}`}
            onClick={() => setCategoriaActiva('binarios')}
          >
            <span>Compuestos Binarios</span>
          </button>
          <button 
            className={`categoria-card ${categoriaActiva === 'ternarios' ? 'activo' : ''}`}
            onClick={() => setCategoriaActiva('ternarios')}
          >
            <span>Compuestos Ternarios</span>
          </button>
          <button 
            className={`categoria-card ${categoriaActiva === 'cuaternarios' ? 'activo' : ''}`}
            onClick={() => setCategoriaActiva('cuaternarios')}
          >
            <span>Compuestos Cuaternarios</span>
          </button>
        </div>
        
        <div className="selectores-elementos">
          <h3>Selecciona {getNumeroElementos()} elementos:</h3>
          <div className="contenedor-selectores-rediseno">
            {Array.from({ length: getNumeroElementos() }, (_, index) => (
              <div key={index} className="selector-elemento-container-rediseno">
                <label>Elemento {index + 1}</label>
                <select 
                  value={elementosSeleccionados[index] ? elementosSeleccionados[index].name : ''}
                  onChange={(e) => {
                    const elemento = elementos.find(el => el.name === e.target.value);
                    manejarSeleccionElemento(index, elemento);
                  }}
                  className="selector-elemento-rediseno"
                  disabled={mezclaRealizada}
                >
                  <option value="">Selecciona un elemento</option>
                  {elementos.map(el => (
                    <option key={el.name} value={el.name}>
                      {el.name} ({el.symbol})
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
        
         <button 
          className="btn-mezclar-rediseno" 
          onClick={mezclaRealizada ? prepararNuevaMezcla : manejarMezcla}
          disabled={!mezclaRealizada && elementosSeleccionados.some(el => !el)}
        >
          {mezclaRealizada ? 'Intentar con otros elementos' : 'Mezclar Elementos'}
        </button>
      </div>
      
      {/* Panel de resultados (Columna derecha) */}
      <div className="panel-resultados">
        <h2 className="titulo-panel">Panel de resultados</h2>
        <div className="quiz-puntuacion">
            <span className="icono-puntuacion">⚗️</span>
            {puntuacionMezcla}
          </div>
        
        
        <div className="zona-resultados">
          {resultado ? (
            <div className={`resultado-tarjeta ${resultado.tipo} ${resultado.tipo === 'error' ? 'animacion-shake' : ''}`}>
              {resultado.tipo === 'exito' ? (
                <>
                  <div className="icono-resultado">✅</div>
                  <h3>¡Combinación correcta!</h3>
                  <p>Has descubierto un nuevo compuesto</p>
                  {resultado.compuesto && (
                    <div className="detalles-compuesto-rediseno">
                      <p><strong>Nombre:</strong> {resultado.compuesto.nombre}</p>
                      <p><strong>Fórmula:</strong> {resultado.compuesto.formula}</p>
                      <p><strong>Tipo:</strong> {resultado.compuesto.tipo}</p>
                      <p><strong>Explicación:</strong> {resultado.compuesto.explicacion}</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="icono-resultado">⚠️</div>
                  <h3>Esa combinación no genera un compuesto válido</h3>
                  <p>Intenta con otros elementos</p>
                  
                </>
              )}
              
            </div>
          ) : (
            <div className="mensaje-inicial">
              <div className="icono-inicial">🔍</div>
              <h3>Selecciona elementos para comenzar</h3>
              <p>Elige una categoría y selecciona los elementos para formar compuestos químicos</p>
            </div>
          )}
        </div>
      </div>
      <QuimiOverlay 
        tipoJuego="mezcla" 
        estadoJuego={estadoQuimi} 
        datos={datosQuimi}
        posicion="izquierda" // Cambiado al lado izquierdo
      />
    </div>
  );
};

// Export the component
export default Juegos;