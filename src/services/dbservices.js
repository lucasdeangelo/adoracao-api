import dbConnections from '../repository/connection.js';

export const insertHinoHarpa = async (numero, titulo, coro, verses) => {
  const { client, db } = await dbConnections.connectMongoDB();
  const hinosCollection = db.collection('hinos');

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
  const hinosCollection = db.collection('hinos');
  const hinos = await hinosCollection.find({}).toArray();

  client.close();
  return hinos;
};

export const fetchHinoByNumero = async (numero) => {
  const { client, db } = await dbConnections.connectMongoDB();
  const hinosCollection = db.collection('hinos');
  const hino = await hinosCollection.findOne({ numero });

  client.close();
  return hino;
};
