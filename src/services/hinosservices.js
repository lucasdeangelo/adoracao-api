import { insertHinoHarpa, fetchHinosHarpa, fetchHinoByNumero } from './dbservices.js';

export const addHinoHarpa = async (numero, titulo, coro, verses) => {
  return await insertHinoHarpa(numero, titulo, coro, verses);
};

export const getHinosHarpa = async () => {
  return await fetchHinosHarpa();
};

export const getHinoByNumero = async (numero) => {
  return await fetchHinoByNumero(numero);
};
