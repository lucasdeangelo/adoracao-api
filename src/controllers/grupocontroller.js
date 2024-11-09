import express from "express";
import groupService from "../services/gruposervices.js";

const route = express.Router();

route.post('/', async (request, response) => {
  try {
    const { name, local, typeGroup, regenteId } = request.body;
          
    if (!name || !local || !typeGroup || !regenteId) {
      return response.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const grupoId = await groupService.createGroup(name, local, typeGroup, regenteId);
    response.status(201).send({ message: 'Grupo criado com sucesso', grupoId });
  } catch (error) {
      if (error.message === "Este regente já possui um grupo e não pode criar outro.") {
          response.status(400).send({ message: error.message });
      } else {
          response.status(500).send({ message: `Erro na criação do grupo: ${error.message}` });
      }
  }
});

route.post('/:grupoId/hinos', async (req, res) => {
  try {
    const { grupoId } = req.params;
    const { hinoId } = req.body;

    const result = await groupService.addHinoToGrupo(grupoId, hinoId);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ message: `Erro ao adicionar hino ao grupo: ${error.message}` });
  }
});

route.get('/:id_grupo/hinos', async (req, res) => {
  try {
    const { id_grupo } = req.params;
    const hinos = await groupService.getHinosDoGrupo(id_grupo);
    res.status(200).json(hinos);
  } catch (error) {
    res.status(500).send({ message: `Erro ao buscar hinos do grupo: ${error.message}` });
  }
});

export default route;
