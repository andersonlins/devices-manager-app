import DeviceController from '../controller/DeviceController';
import Router from 'express'

const router = Router();

router.get('/', DeviceController.index)
router.get('/:id', DeviceController.get)
router.post('/', DeviceController.add)
router.put('/:id', DeviceController.update)
router.delete('/:id', DeviceController.delete)

export default router;