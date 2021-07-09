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
        foreignKey: 'brands_id',
        as: "brand"
      });
      Product.belongsTo(models.Category, {
        foreignKey: 'categories_id',
        as: "category"
      });
      Product.belongsTo(models.Gender, {
        foreignKey: 'genders_id',
        as: "gender"
      });
      Product.hasMany(models.Image, {
        foreignKey: 'product_id',
        as: "Images"
      });
      Product.belongsTo(models.Size, {
        foreignKey: 'sizes_id',
        as: "size"
      });
      Product.belongsTo(models.Color, {
        foreignKey: 'colors_id',
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
    
    categories_id: DataTypes.INTEGER,
    brands_id: DataTypes.INTEGER,
    colors_id: DataTypes.INTEGER,
    genders_id: DataTypes.INTEGER,
    sizes_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};