const { response } = require('express');
const fs = require('fs');
const path = require('path');
let db = require('../../database/models');
const sequelize = db.Sequelize;


module.exports = {
  list: async (req, res) => {
    try {
      // Busco todos los productos en db
      let products = await db.Product.findAll({
          include: ["brand", "color", "size", "category", "Images"]
      });

      let Surf = await db.Product.count({
          where: {
            categories_id: 1
          }
      })
      let Kitesurf = await db.Product.count({
          where: {
            categories_id: 2
          }
      })
      let Paddlesurf = await db.Product.count({
          where: {
            categories_id: 3
          }
      })
      let Wakeboard = await db.Product.count({
          where: {
            categories_id: 4
          }
      })
      let Snorkel = await db.Product.count({
        where: {
          categories_id: 5
        }
    })
    let Windsurf = await db.Product.count({
      where: {
        categories_id: 6
      }
  })
      let countCategories = await db.Category.count()
      // Elimino datos innecesarios del JSON
      let arrayRespuesta = products.map((product) => { 
          delete product.dataValues.createdAt;
          delete product.dataValues.updatedAt;
          delete product.dataValues.destroyTime;
          delete product.dataValues.brandId;
          delete product.dataValues.categoryId;
          delete product.dataValues.colorId;
          delete product.dataValues.sizeId;
          product.dataValues.detail = `api/products/${product.id}`
          return product;})

      // Armo respuesta en formato JSON
      let respuesta = {
          meta: {
              status : 200,
              count: products.length,
              categoriesCount : countCategories,
              countByCategory: {
                  Surf: Surf,
                  Kitesurf: Kitesurf,
                  Paddlesurf: Paddlesurf,
                  Wakeboard: Wakeboard,
                  Snorkel: Snorkel,
                  Windsurf: Windsurf

              },
              url: 'api/products'
          },
          data: arrayRespuesta
      }

      res.json(respuesta);
  } catch (error) {
      console.log(error);
      return res.status(500);
  }
},

  productDetail: async (req, res) => {
    try {
      // Busco el producto en la DB
      let product = await db.Product.findOne(
        {
          where: { id: req.params.id },
          include: ["brand", "color", "size", "category", "Images"]
        }
      )
      // Almaceno url de img en variable
      let imgUrl = "http://" + req.headers.host + `/images/producto/${product.dataValues.Images[0].file}`;

      // Inserto url de imagen en product
      product.dataValues.urlImg = imgUrl;

      // Elimino data innecesaria del objeto product
      delete product.dataValues.destroyTime;
      delete product.dataValues.brands_id;
      delete product.dataValues.categories_id;
      delete product.dataValues.sizes_id;
      delete product.dataValues.colors_id;

      // Armo respuesta en formato JSON
      let respuesta = {
        meta: {
          status: 200,
          url: `api/products/${product.id}`
        },
        data: product
      }

      res.json(respuesta);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },

  lastProduct: async (req, res) => {
    try {
        // Busco el id del ultimo producto creado
        let lastProductId = await db.Product.findOne({
            attributes: [[sequelize.fn('max', sequelize.col('id')), 'id']],
            raw: true
        });
        // Busco el ultimo producto creado
        let product = await db.Product.findOne({where: {id: lastProductId.id}, include: ["Images"]});

        // Almaceno url de img en variable
        let imgUrl = "http://" + req.headers.host + `/images/producto/${product.dataValues.Images[0].file}`;

        // Inserto url de imagen en product
        product.dataValues.urlImg = imgUrl;

        // Armo respuesta
        let respuesta = {
            meta: {
                status : 200,
                url: `api/lastProduct`
            },
            data: product
        }
        res.json(respuesta);
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
}
};