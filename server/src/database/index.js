import Sequelize from 'sequelize';
import Category from '../app/models/Category';
import Device from '../app/models/Device';
import databaseConfig from '../config/database';
const models = [Category, Device];
 
class Database {
  constructor(){
    this.init();
  }
 
  init(){
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection))
      .map((model) => {
          if(model.associate) model.associate(this.connection.models);
          return model;
      })
  }
}
 
export default new Database();