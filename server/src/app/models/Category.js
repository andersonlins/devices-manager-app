import Sequelize, { Model } from "sequelize";
 
class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING(128),
      },
      {
        sequelize,
        tableName: 'Category'
      }
    );
 
    return this;
  }
}
 
export default Category