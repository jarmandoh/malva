import productsData from '../data/products.json';
import { Product } from '../types';

export const getProducts = async (): Promise<Product[]> => {
  // Simula una llamada a API asíncrona
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productsData as Product[]);
    }, 100); // Pequeño retraso para simular carga
  });
};