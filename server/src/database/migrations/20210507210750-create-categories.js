'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable("category",{
    id:{
      type: Sequelize.INTEGER,
      allowNull:false,
      autoIncrement: true,
      primaryKey:true,
      unique: true,
    },
    name:{
      type: Sequelize.STRING(128),
      allowNull:false,
      unique: true,
      validate: {
        max: 128
      }
    },
  }),

  down: (queryInterface) => queryInterface.dropTable("category")
};
