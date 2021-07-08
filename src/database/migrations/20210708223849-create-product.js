'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      stock: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      // image: {
      //   allowNull: false,
      //   type: Sequelize.STRING
      // },
      
      keywords: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'category',
          key: 'id'}
      },
      brandId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'brand',
          key: 'id'}
      },
      colorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'color',
          key: 'id'}
      },
      genderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'gender',
          key: 'id'}
      },
      sizeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'size',
          key: 'id'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};