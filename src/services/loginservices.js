import db from '../repository/connection.js';

async function loginUser(email, password){
    const sql = 'SELECT id_usuario, email, nome, senha, tipo_usuario FROM usuarios WHERE email=? AND senha=?';

    const dataLogin = [email, password];
    const conn = await db.connect();
    const [rows] = await conn.query(sql, dataLogin);
    conn.end();

    return rows;
}

export default {loginUser}