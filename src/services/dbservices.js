import dbConnections from '../repository/connection.js';
import { ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config(); 

const COLLECTION_HARPA = process.env.COLLECTION_HARPA;
const COLLECTION_HINARIO_GERAL = process.env.COLLECTION_HINARIO_GERAL;

export const insertHinoHarpa = async (numero, titulo, coro, verses) => {
  const { client, db } = await dbConnections.connectMongoDB();
  const hinosCollection = db.collection(COLLECTION_HARPA);

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
  const hinosCollection = db.collection(COLLECTION_HARPA);
  const hinos = await hinosCollection.find({}).toArray();

  client.close();
  return hinos;
};

export const fetchHinoByNumero = async (numero) => {
  const { client, db } = await dbConnections.connectMongoDB();
  const hinosCollection = db.collection(COLLECTION_HARPA);
  const hino = await hinosCollection.findOne({ numero });

  client.close();
  return hino;
};

export const fetchHinosGeral = async () => {
  const { client, db } = await dbConnections.connectMongoDB();
  const hinosCollection = db.collection(COLLECTION_HINARIO_GERAL);
  const hinario = await hinosCollection.find({}).toArray();

  client.close();
  return hinario;
};

export const fetchHinoById = async (hinoId) => {
  const { client, db } = await dbConnections.connectMongoDB();
  const hinosCollection = db.collection(COLLECTION_HINARIO_GERAL);
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

export const fetchHinoHarpaById = async (id) => {
  const { client, db } = await dbConnections.connectMongoDB();
  const hinosCollection = db.collection(COLLECTION_HARPA);
  
  try {
    const hino = await hinosCollection.findOne({ _id: new ObjectId(id) });
    if (!hino) {
      throw new Error(`Hino da Harpa com ID ${id} não encontrado.`);
    }
    return hino;
  } catch (error) {
    console.error("Erro ao buscar hino da Harpa pelo ObjectId:", error.message);
    throw error;
  } finally {
    client.close();
  }
};