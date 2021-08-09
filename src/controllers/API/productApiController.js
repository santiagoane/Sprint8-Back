const {	validationResult } = require('express-validator');

const fs = require('fs');

let db = require('../../database/models');
const Op = db.Sequelize.Op;


module.exports = {
  list: async (req, res) => {
    try {
      let productInDb = await db.Product.findAll({
        include: ["category","Images"],
      });
      let countProduct = await db.Product.count();
      let countByCategory= await db.Category.findAndCountAll({
        include: ["products"]
      });

      
      Promise.all([productInDb,countProduct,countByCategory])
      .then(([dataProductInDb,dataCountProduct,dataCountByCategory])=>{

        let products = [] ;
        dataProductInDb.forEach(i=> {
          products.push({
            id:i.id,
            name:i.name,
            description:i.description,
            images: i.Images,
            detail: `http://${req.headers.host}/api/products/${i.id}`
          })
        });
        let countByCategory=[];
        dataCountByCategory.rows.forEach(i=>{
          countByCategory.push({
            name:i.name,
            productByCategory: i.products.length
          })
        })
          
          res.json({
            meta:{
              status: 200,
              total : dataCountProduct,
              url : `http://${req.headers.host}/api/products`
            },
            data:{
              count: dataCountProduct,
              countByCategory:countByCategory,
              products :products
            }
          });
      })
 
    } catch(error){
      console.log(error);
      res.json({
        status : 500,
        detail : 'Error interno en la peticion de la información'
      })

    };

  },

  productDetail: (req, res) => {
    
    db.Product.findByPk(req.params.id, {
      include: ["category","Images"],
    })
      .then((productInDb) => {
          let product = {
            id:           productInDb.id,
            name:         productInDb.name,
            price:        productInDb.price,
            stock:        productInDb.stock,           
            categories_id:productInDb.categories_id,            
            description:  productInDb.description,            
            categories:   productInDb.category,
            images:       productInDb.Images,
            imgUrl:       `http://${req.headers.host}/img/${productInDb.Images[0].file}`
          }
          return res.json({ 
            meta:{
              status: 200,
              total : productInDb.length,
              url :`http://${req.headers.host}/api/products/${productInDb.id}`
            },
            data: product });
        })
      .catch((error) => {
        console.log(error);
        res.json({
          status : 500,
          detail : 'Error interno en la peticion de la información'
        })
      });
  },

  productSearch: (req, res) => {
    let search = req.query.search;
    db.Product.findAll({
      where: {
        name: { [Op.like]: `%${search}%` },
      },
      include: ["category","Images"],
    })
    .then((productsInDb) => {
        if (products.length > 0) {
          return res.json(products);
         
        }
        return res.json(products);
    })
    .catch(function (e) {
        console.log(e);
    });
  }
  
};