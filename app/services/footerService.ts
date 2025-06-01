import footerData from '../data/footer.json';
import { FooterColumn } from '../types';

export const getFooterItems = async (): Promise<FooterColumn[]> => {
  // Simula una llamada a API asíncrona
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(footerData as FooterColumn[]);
    }, 100); // Pequeño retraso
  });
};