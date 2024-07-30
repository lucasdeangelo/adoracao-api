import mysql2 from "mysql2/promise";
import { MongoClient } from "mongodb";

async function connect() {
  const connection = await mysql2.createConnection({
    host: 'localhost',
    password: '',
    port: '3306',
    database: 'Adoracao',
    user: 'root'
  })

return connection;
}

async function connectMongoDB() {
  const mongoUrl = 'mongodb+srv://devlucasdeangelo:aKICD4vVs7H5cxG9@adoracaodb.pnlnmh0.mongodb.net/';
  const client = new MongoClient(mongoUrl)

  try {
    await client.connect();
    const db = client.db('Hinos');
    return { client, db };
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

export default {connect, connectMongoDB}