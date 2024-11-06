import express from "express";
import groupService from "../services/gruposervices.js";
import { addHinoToGrupo, getHinosDoGrupo } from "../services/gruposervices.js";

const route = express.Router();

route.post('/', async (request, response) => {
  try {
    const { name, local, typeGroup, regenteId } = request.body;
          
    if (!name || !local || !typeGroup || !regenteId) {
      return response.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const result = await groupService.createGroup(name, local, typeGroup, regenteId);
    response.status(201).send(result);
  } catch (error) {
      if (error.message === "Este regente já está associado a um grupo.") {
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

    const result = await addHinoToGrupo(grupoId, hinoId);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ message: `Erro ao adicionar hino ao grupo: ${error.message}` });
  }
});

route.get('/:grupoId/hinos', async (req, res) => {
  try {
    const { grupoId } = req.params;
    
    const hinos = await getHinosDoGrupo(grupoId);
    res.status(200).json(hinos);
  } catch (error) {
    res.status(500).send({ message: `Erro ao buscar hinos do grupo: ${error.message}` });
  }
});

export default route;