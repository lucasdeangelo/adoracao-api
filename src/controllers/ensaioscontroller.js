import express from 'express';
import { createEnsaio, getEnsaiosDoGrupo } from '../services/ensaiosservices.js';

const route = express.Router();

route.post('/:id_grupo', async (req, res) => {
    const { id_grupo } = req.params;
    const { data, descricao, local, hinoIds } = req.body;

    try {
        const response = await createEnsaio(id_grupo, data, descricao, local, hinoIds || []);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).send({ message: `Erro ao criar ensaio: ${error.message}` });
    }
});


route.get('/:id_grupo', async (req, res) => {
    try {
        const { id_grupo } = req.params;
        const ensaios = await getEnsaiosDoGrupo(id_grupo);
        res.status(200).json(ensaios);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar ensaios do grupo: ${error.message}` });
    }
});

export default route;