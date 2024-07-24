import express from "express";
import db from '../services/loginservices.js';
import { generateToken } from "../helpers/userFeatures.js";

const route = express.Router();
route.post('/', async(request, response) =>{
    const {email, password} = request.body;
    try{
        const users = await db.loginUser(email, password);
        if(users.length > 0){
            const id_user = users[0].idUser
            const email_user = users[0].email
            const token = generateToken(id_user, email_user)
            response.status(200).send({message:'Login efeito efeituado com sucesso', token})
        } else{
            response.status(401).send({message:'Login incorreto'})
        }
    } catch (error) {
        response.status(500).send({message:`Houve um erro no banco de dados ${error}`})
    }
});

export default route;