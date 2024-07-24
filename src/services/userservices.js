import db from '../repository/connection.js'

async function createUser(name, email, password, typeUser){
  const sql = "INSERT INTO usuarios(nome, email, senha, tipo_usuario) VALUES(?,?,?,?)"
  
  const values = [name, email, password, typeUser];
  const conn = await db.connect();
  await conn.query(sql, values)
  conn.end();
}

async function updateUser(name, email, password, typeUser, idUser){
  const sql = "UPDATE usuarios SET nome = ?, email = ?, senha = ?, tipo_usuario = ? WHERE id_usuario = ?"
  const values = [name, email, password, typeUser, idUser]

  const conn = await db.connect()
  await conn.query(sql, values)
  conn.end();
}

async function deleteUser(idUser){
  const sql = "DELETE FROM usuarios WHERE id_usuario = ?"
  const conn = await db.connect()
  await conn.query(sql, idUser)
  conn.end();
}

export default {createUser, updateUser, deleteUser};
