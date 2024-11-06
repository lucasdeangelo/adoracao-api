import express from 'express'
import loginUser from './controllers/logincontroller.js';
import routerUser from "./controllers/usercontroller.js";
import { createHinoHarpa, fetchAllHinosHarpa, fetchHinoHarpaByNumero, fetchHinosGeral } from './controllers/hinoscontroller.js';
import createGroup from "./controllers/grupocontroller.js";

const routes = express.Router()
routes.use('/login', loginUser);
routes.use('/user', routerUser);
routes.use('/grupo', createGroup);
routes.use('/hinoHarpa', createHinoHarpa);
routes.use('/hinosHarpa', fetchAllHinosHarpa);
routes.use('/hinosHarpa/:numero', fetchHinoHarpaByNumero);
routes.use('/hinario', fetchHinosGeral);

export default routes;