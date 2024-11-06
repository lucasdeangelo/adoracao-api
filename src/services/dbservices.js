import dbConnections from '../repository/connection.js';
import { ObjectId } from 'mongodb';

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

export const fetchHinosGeral = async () => {
  const { client, db } = await dbConnections.connectMongoDB();
  const hinosCollection = db.collection('hinario_geral');
  const hinario = await hinosCollection.find({}).toArray();

  client.close();
  return hinario;
};

export const fetchHinoById = async (hinoId) => {
  const { client, db } = await dbConnections.connectMongoDB();
  const hinosCollection = db.collection('hinario_geral');
  try {
    const hino = await hinosCollection.findOne({ _id: new ObjectId(hinoId) });
    if (!hino) throw new Error("Hino não encontrado no MongoDB");
    return hino;
  } catch (error) {
    console.error("Erro ao buscar hino no MongoDB:", error.message);
    throw error;
  } finally {
    client.close();
  }
};

