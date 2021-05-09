import DeviceController from '../controller/DeviceController';
import Router from 'express'

const router = Router();

router.get('/devices', DeviceController.index)
router.get('/devices/:id', DeviceController.get)
router.post('/devices', DeviceController.add)
router.put('/devices/:id', DeviceController.update)
router.delete('/devices/:id', DeviceController.delete)

export default router;