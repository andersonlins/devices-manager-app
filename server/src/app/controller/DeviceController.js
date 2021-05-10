import Category from "../models/Category";
import Device from "../models/Device";

class DeviceController {
    async add(req, res) {
      const device = await Device.create(req.body);
      return res.json(device)
    }
    async index(req, res) {
      const device = await Device.findAll({ include: [{model: Category, as: 'category'}]});
      return res.json(device)
    }
    async update(req, res) {
      let device = await Device.findByPk(req.params.id)
      device = await device.update(req.body)
      return res.json(device)
    }
    async delete(req, res) {
      let device = await Device.findByPk(req.params.id)
      device = await device.destroy(req.body)
      return res.json(device)
    }
    async get(req, res) {
      let device = await Device.findByPk(req.params.id, {
          attributes: [
              'id','color', 'partNumber', 'categoryId',
          ],
          include: [
              { 
                  model: Category,
                  as: 'category'
              }
          ]
      })
      return res.json(device)
    }
  }
   
  export default new DeviceController();