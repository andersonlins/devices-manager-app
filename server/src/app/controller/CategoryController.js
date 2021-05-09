import Category from "../models/Category";
 
class CategoryController {
  async add(req, res) {
    const category = await Category.create(req.body);
    return res.json(category)
  }
  async index(req, res) {
    const categories = await Category.findAll();
    return res.json(categories)
  }
  async update(req, res) {
    let category = await Category.findByPk(req.params.id)
    category = await category.update(req.body)
    return res.json(category)
  }
  async delete(req, res) {
    let category = await Category.findByPk(req.params.id)
    category = await category.destroy(req.body)
    return res.json(category)
  }
  async get(req, res) {
    let category = await Category.findByPk(req.params.id)
    return res.json(category)
  }
}
 
export default new CategoryController();