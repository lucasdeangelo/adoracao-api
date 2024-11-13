import db from '../repository/connection.js';

export const createEnsaio = async (id_grupo, data, descricao, local, hinoIds = []) => {
    const conn = await db.connect();
    try {
        const ensaioSql = "INSERT INTO ensaios_grupo (grupo_id, data, descricao, local) VALUES (?, ?, ?, ?)";
        const [result] = await conn.query(ensaioSql, [id_grupo, data, descricao, local]);
        const ensaioId = result.insertId;

        return { message: "Ensaio criado com sucesso", ensaioId };
    } catch (error) {
        console.error("Erro ao criar ensaio:", error);
        throw error;
    } finally {
        conn.end();
    }
};


export const getEnsaiosDoGrupo = async (id_grupo) => {
    const conn = await db.connect();
    try {
        const sql = "SELECT * FROM ensaios_grupo WHERE grupo_id = ?"
            
        const [ensaios] = await conn.query(sql, [id_grupo]);

        return ensaios;
    } catch (error) {
        console.error("Erro ao buscar ensaios do grupo:", error);
        throw error;
    } finally {
        conn.end();
    }
};
