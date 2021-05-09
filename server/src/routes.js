import Router from 'express';
import CategoriasRouter from './categories.routes'

import DeviceController from './app/controller/DeviceController';
const routes = Router();
 
routes.get('/',function(req,res){
    return res.json({
        ok:true
    })
})

routes.use('/categories', CategoriasRouter);

routes.get('/devices', DeviceController.index)
routes.get('/devices/:id', DeviceController.get)
routes.post('/devices', DeviceController.add)
routes.put('/devices/:id', DeviceController.update)
routes.delete('/devices/:id', DeviceController.delete)

export default routes;