'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable("device", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey:true,
      autoIncrement: true,
      allowNull:false,
      unique: true
    },
    categoryId: {
      type: Sequelize.INTEGER
    },
    color: {
      type: Sequelize.STRING(16),
      allowNull:false,
      validate: {
        max: 16
      }
    },
    partNumber: {
      type: Sequelize.INTEGER,
      allowNull:false,
    },
  }).then(() => queryInterface.addConstraint('device', ['categoryId'], {
    type: 'FOREIGN KEY',
    name: 'FK_category_device',
    references: {
      table: 'category',
      field: 'id',
    },
    onDelete: 'no action',
    onUpdate: 'no action',
    allowNull: false,
  })),

  down: (queryInterface) => queryInterface.dropTable("device")
};
