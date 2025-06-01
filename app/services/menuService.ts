import menuData from '../data/menu.json';
import { MenuItem } from '../types';

export const getMenuItems = async (): Promise<MenuItem[]> => {
  // Simula una llamada a API asíncrona
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(menuData as MenuItem[]);
    }, 100); // Pequeño retraso para simular carga
  });
};