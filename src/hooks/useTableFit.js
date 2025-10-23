import { useState, useEffect } from 'react';

export function useTableFit(tableRef) {
  const [tableFits, setTableFits] = useState(null); // Inicialmente null para saber si aún no se ha calculado

  useEffect(() => {
    const checkTableFit = () => {
      if (tableRef?.current) {
        const tableWidth = tableRef.current.scrollWidth;
        const containerWidth = tableRef.current.parentElement.clientWidth;
        setTableFits(tableWidth <= containerWidth);
      }
    };

    // Usar un timeout para asegurar que los elementos están renderizados
    const timeoutId = setTimeout(checkTableFit, 100);
    
    window.addEventListener('resize', checkTableFit);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkTableFit);
    };
  }, [tableRef]);

  return tableFits;
}