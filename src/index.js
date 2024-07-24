import Express from 'express'
import routes from './routes.js'
import cors from 'cors';

const api = Express()
api.use(cors());
api.use(Express.json());

api.use('/', routes);

api.listen(3333, () =>{
  console.log("server is running")
})