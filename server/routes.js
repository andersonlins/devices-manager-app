import Router from 'express';
import CategoriesRouter from './src/app/routes/categories.routes.js'
import DevicesRouter from './src/app/routes/devices.routes.js'
import path from 'path'

const routes = Router();

const n_dirname = process.cwd();
console.log(n_dirname)
routes.get('/',function(req,res){
    return res.sendFile(path.join(n_dirname, '/public/index.html'));
})

routes.use('/api/categories', CategoriesRouter);
routes.use('/api/devices', DevicesRouter);

export default routes;