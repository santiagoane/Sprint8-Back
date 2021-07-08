'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Product.belongsTo(models.Brand, {
        foreignKey: 'brandId',
        as: "brand"
      });
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: "category"
      });
      Product.belongsTo(models.Gender, {
        foreignKey: 'genderId',
        as: "gender"
      });
      Product.hasMany(models.Image, {
        foreignKey: 'productId',
        as: "Images"
      });
      Product.belongsTo(models.Size, {
        foreignKey: 'sizeId',
        as: "size"
      });
      Product.belongsTo(models.Color, {
        foreignKey: 'colorId',
        as: "color"
      });

    }
  };
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER,
    image: DataTypes.STRING,
    keywords: DataTypes.TEXT,
    categoryId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
    colorId: DataTypes.INTEGER,
    genderId: DataTypes.INTEGER,
    sizeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};