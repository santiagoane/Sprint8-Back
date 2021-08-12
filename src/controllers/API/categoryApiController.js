const { response } = require('express');
const db = require('../../database/models');
const sequelize = db.sequelize;
const path = require('path');


let categoryApiController = {
    list: async (req, res) => {
        try {
            // Busco todos las categorias en db
            let categories = await db.Category.findAll();

            // Cuento la cantidad de categorias en db
            let countCategories = await db.Category.count();

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

            // Armo array con los valores de cantidad de producto de cada categoria
            let categoriesArray = [Surf, Kitesurf, Paddlesurf, Wakeboard, Snorkel, Windsurf]

            // Itero en array categorias insertandole la propiedad count
            let categoriesWithCount = () =>{
                for (let i = 0; i < categoriesArray.length; i++) {
                    categories[i].dataValues.count = categoriesArray[i];
                }
            }
            // Llamo a la funcion categoriesWithCount
            categoriesWithCount();

            // Armo respuesta en formato JSON
            let respuesta = {
                meta: {
                    status : 200,
                    count: categories.length,
                    categoriesCount : countCategories,
                    url: 'api/categories'
                },
                data: {
                    categories
                }
            }

            res.json(respuesta);
        } catch (error) {
            console.log(error);
            return res.status(500);
        }
    }
}

module.exports = categoryApiController;