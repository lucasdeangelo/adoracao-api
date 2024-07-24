import express, { request, response } from "express";
import db from "../services/userservices.js";

const route = express.Router();

route.post('/', async(request, response) => {
  try{
    const {name, email, password, typeUser} = request.body;
    await db.createUser(name, email, password, typeUser);
    response.status(201).send({message:`Salvo com sucesso`});
  }catch{
    response.status(500).send({message:`Erro na requisição`})
  }
});

route.put('/', async(request, response) => {
  try{
    const {name, email, password, typeUser, idUser} = request.body;
    await db.updateUser(name, email, password, typeUser, idUser);
    response.status(200).send({message:`Dados Atualizados com sucesso!`});
  }catch{
    response.status(500).send({message:`Erro na requisição`})
  }
});

route.delete('/:idUser', async(request, response) => {
  try{
    const {idUser} = request.params
    await db.deleteUser(idUser) 
    response.status(200).send({message:`Usuário deletado com sucesso!`});
  }catch(error){
    response.status(500).send({message:`Erro na requisição  `})
  }
})
export default route;