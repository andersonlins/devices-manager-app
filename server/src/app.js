import express from 'express';
import routes from './routes.js';
import cors from 'cors';
import './database';

class App {
    constructor(){
        this.server = express();
        this.middlewares()
        this.routes()
    }
 
    routes(){
        this.server.use(routes)
    }
 
    //Se ocorrerá algum tipo de middleware na aplicação
    middlewares(){
        this.server.use(cors())
        this.server.use(express.json())
    }
}
 
export default new App().server;