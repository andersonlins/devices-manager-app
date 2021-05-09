import Sequelize, { Model } from "sequelize";
import Category from "./Category";
 
class Device extends Model {
  static init(sequelize) {
    super.init(
      {
        color: Sequelize.STRING(16),
        partNumber: Sequelize.INTEGER(),
      },
      {
        sequelize,
      }
    );
 
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category',
    });
  }
}
 
export default Device