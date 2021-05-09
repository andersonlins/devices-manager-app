import Router from 'express';
import CategoriesRouter from './app/routes/categories.routes'
import DevicesRouter from './app/routes/devices.routes'

const routes = Router();
 
routes.get('/',function(req,res){
    return res.json({
        ok:true
    })
})

routes.use('/categories', CategoriesRouter);
routes.use('/devices',DevicesRouter);

export default routes;