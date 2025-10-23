import { useState, useEffect } from 'react';

export function useElementos() {
  const [state, setState] = useState({
    elementos: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('[useElementos] Iniciando carga de datos desde JSON...');
        
        // Ruta para JSON en public/data/
        const jsonPath = '/data/DataElementos.json';
        console.log('Intentando cargar desde:', jsonPath);
        
        const response = await fetch(jsonPath);
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        
        const jsonData = await response.json();
        console.log('JSON cargado correctamente. Número de elementos:', jsonData.length);

        if (!jsonData || jsonData.length === 0) {
          throw new Error('El JSON no contiene datos');
        }

        const elementosProcesados = jsonData
          .filter(item => item.symbol && item.number) // Filtro mínimo
          .map(item => ({
            number: parseInt(item.number) || 0,
            symbol: item.symbol.trim(),
            name: item.name?.trim() || '',
            category: item.category?.toLowerCase().replace(/\s+/g, '-') || 'desconocido',
            xpos: parseInt(item.xpos) || 1,
            ypos: parseInt(item.ypos) || 1,
            atomic_mass: parseFloat(item.atomic_mass) || null,
            electronConfiguration: item.electron_configuration || '',
            electronegativityPauling: item.electronegativity_pauling || '',
            oxidationStates: item.oxidation_states || '',
            phase: item.phase || '',
            summary: item.summary || '',
            uso: item.uso || '',
            youtube: item.youtube || '',
          }));

        console.log('Elementos procesados:', elementosProcesados.length);
        
        setState({
          elementos: elementosProcesados,
          loading: false,
          error: null
        });
      } catch (err) {
        console.error('Error en useElementos:', err);
        setState({
          elementos: [],
          loading: false,
          error: `Error al cargar datos: ${err.message}`
        });
      }
    };

    loadData();
  }, []);

  return state;
}