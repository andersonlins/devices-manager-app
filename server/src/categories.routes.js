import CategoryController from './app/controller/CategoryController';
import Router from 'express'

const router = Router();

router.get('/', CategoryController.index)
router.get('/:id', CategoryController.get)
router.post('/', CategoryController.add)
router.put('/:id', CategoryController.update)
router.delete('/:id', CategoryController.delete)

export default router;