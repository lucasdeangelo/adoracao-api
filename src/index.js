import Express from 'express'
import routes from './routes.js'
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const api = Express()
api.use(cors());
api.use(Express.json());

api.use('/', routes);

const PORT = process.env.PORT || 3333; 
api.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});