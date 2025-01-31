import express from 'express'
import loginUser from './controllers/logincontroller.js';
import routerUser from "./controllers/usercontroller.js";
import { createHinoHarpa, fetchAllHinosHarpa, fetchHinoHarpaByNumero, fetchHinosGeral } from './controllers/hinoscontroller.js';
import grupoController from "./controllers/grupocontroller.js";
import ensaioRouter from './controllers/ensaioscontroller.js';
import eventoRouter from './controllers/eventoscontroller.js';
import favoritosRouter from './controllers/favoritoscontroller.js';

const routes = express.Router()
routes.use('/login', loginUser);
routes.use('/user', routerUser);
routes.use('/grupo', grupoController);
routes.use('/hinoHarpa', createHinoHarpa);
routes.use('/hinosHarpa', fetchAllHinosHarpa);
routes.use('/hinosHarpa/:numero', fetchHinoHarpaByNumero);
routes.use('/hinario', fetchHinosGeral);
routes.use('/ensaios', ensaioRouter);
routes.use('/eventos', eventoRouter);
routes.use('/favoritos', favoritosRouter);

export default routes;