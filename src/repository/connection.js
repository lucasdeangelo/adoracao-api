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
  const mongoUrl = 'mongodb://mongo:YjodjGvDkHCipIzmIEVUIJgmVMONEhKI@monorail.proxy.rlwy.net:30091/';
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