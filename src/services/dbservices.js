import dbConnections from '../repository/connection.js';

export const insertHinoHarpa = async (numero, titulo, coro, verses) => {
  const { client, db } = await dbConnections.connectMongoDB();
  const hinosCollection = db.collection('harpa_crista');

  const result = await hinosCollection.insertOne({
    numero,
    titulo,
    coro,
    verses
  });

  client.close();
  return result;
};

export const fetchHinosHarpa = async () => {
  const { client, db } = await dbConnections.connectMongoDB();
  const hinosCollection = db.collection('harpa_crista');
  const hinos = await hinosCollection.find({}).toArray();

  client.close();
  return hinos;
};

export const fetchHinoByNumero = async (numero) => {
  const { client, db } = await dbConnections.connectMongoDB();
  const hinosCollection = db.collection('harpa_crista');
  const hino = await hinosCollection.findOne({ numero });

  client.close();
  return hino;
};

export const fetchHinosGeral = async () => {
  const { client, db } = await dbConnections.connectMongoDB();
  const hinosCollection = db.collection('hinario_geral');
  const hinario = await hinosCollection.find({}).toArray();

  client.close();
  return hinario;
};