import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Definimos uma interface para a window para evitar erros de tipo com o dataLayer
interface WindowWithDataLayer extends Window {
  dataLayer: any[];
}

// Declaramos a window com o novo tipo
declare const window: WindowWithDataLayer;

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Verificamos se o dataLayer existe na window
    if (window.dataLayer) {
      // Disparamos o evento para o GTM
      window.dataLayer.push({
        event: 'page_loaded',
        page_details: {
          path: location.pathname, // O caminho da URL atual, pego dinamicamente
          brand: 'defi-yield-finder',
        },
      });
    }
  }, [location.pathname]); // Este hook roda toda vez que o pathname da URL muda
};