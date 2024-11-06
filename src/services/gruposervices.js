import db from '../repository/connection.js';

async function createGroup(name, local, typeGroup, regenteId) {
    const conn = await db.connect();
    try {      
        const checkGroupSql = "SELECT COUNT(*) AS count FROM grupo WHERE regente_id = ?";
        const [rows] = await conn.query(checkGroupSql, [regenteId]);

        if (rows[0].count > 0) {
            throw new Error("Este regente já possui um grupo e não pode criar outro.");
        }
  
        const checkRegenteSql = "SELECT regente_id FROM regentes WHERE usuario_id = ?";
        const [regenteRows] = await conn.query(checkRegenteSql, [regenteId]);

        let regenteRefId;
        
        if (regenteRows.length === 0) {
            const insertRegenteSql = "INSERT INTO regentes (usuario_id) VALUES (?)";
            const [result] = await conn.query(insertRegenteSql, [regenteId]);
            regenteRefId = result.insertId;
        } else {
            regenteRefId = regenteRows[0].regente_id;
        }
       
        const sql = "INSERT INTO grupo (nome, local, tipo_grupo, regente_id) VALUES (?, ?, ?, ?)";
        const values = [name, local, typeGroup, regenteRefId];
        const [groupResult] = await conn.query(sql, values);
        const groupId = groupResult.insertId;

        const getRegentesSql = "SELECT id_usuario FROM usuarios WHERE tipo_usuario = 'Regente'";
        const [regentes] = await conn.query(getRegentesSql);
        
        const addRegenteSql = "INSERT INTO regentes_grupo (regente_id, grupo_id) VALUES (?, ?)";
        for (const regente of regentes) {
            
            const regenteGroupIdSql = "SELECT regente_id FROM regentes WHERE usuario_id = ?";
            const [regenteGroupIdRows] = await conn.query(regenteGroupIdSql, [regente.id_usuario]);

            if (regenteGroupIdRows.length > 0) {
                await conn.query(addRegenteSql, [regenteGroupIdRows[0].regente_id, groupId]);
            }
        }

        return { message: 'Grupo criado com sucesso e regentes adicionados', groupId };
    } catch (error) {
        throw error;
    } finally {
        conn.end();
    }
}

export default { createGroup };
