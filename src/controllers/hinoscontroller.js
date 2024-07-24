import { addHinoHarpa, getHinosHarpa, getHinoByNumero } from '../services/hinosservices.js';

export const createHinoHarpa = async (request, response) => {
  const { numero, titulo, coro, verses } = request.body;

  try {
    const result = await addHinoHarpa(numero, titulo, coro, verses);
    response.send('Hino added');
  } catch (err) {
    console.error('Error:', err);
    response.status(500).send('Error inserting hino');
  }
};

export const fetchAllHinosHarpa = async (request, response) => {
  try {
    const hinos = await getHinosHarpa();
    response.json(hinos);
  } catch (err) {
    console.error('Error:', err);
    response.status(500).send('Error fetching hinos');
  }
};

export const fetchHinoHarpaByNumero = async (request, response) => {
  const { numero } = request.params;
  try {
    const hino = await getHinoByNumero(numero);
    if (hino) {
      response.json(hino);
    } else {
      response.status(404).send('Hino not found');
      console.log(numero, hino)
    }
  } catch (err) {
    console.error('Error:', err);
    response.status(500).send('Error fetching hino');
  }
};
