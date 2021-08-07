const { validationResult } = require('express-validator');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { log } = require('console');



let productController = {

    home: (req, res) => {
        console.log('entro al home del produt controller y redirijo')

        res.redirect('/')

    },

    // Función que muestra el detalle del producto, cuando hacemos click en la foto
    show: async (req, res) => {

        // Le delego al modelo la responsabilidad
        // que la busque por ID del registro seleccionado
        // es por ello que atrapo em parámetro id

        try {
            const product = await db.Product.findByPk(req.params.id,
                {
                    include: [
                        "brand", "category", "Images", "size", "color"
                    ]
                }

            );
            console.log(JSON.parse(JSON.stringify(product)))
            //console.log(product.images);
            return res.render('productos/detailProduct', { product });

        }
        catch (error) {
            console.log(error);

        }
    },

    // Función que muestra el formulario de crear Productos
    // create: (req, res) => {
    //     console.log('Entre a create')
    //     res.render('productos/createProduct');
    // },
    create: async (req, res) => {
        try {
            let categories = await db.Category.findAll();
            let brands = await db.Brand.findAll();
            let sizes = await db.Size.findAll();
            let colors = await db.Color.findAll();

            res.render('productos/createProduct', { categories, brands, colors, sizes });
        } catch (error) {
            console.log(error);
            return res.status(500);
        }

    },
    // Función que simula el almacenamiento, en este caso en array

    store: async (req, res) => {
        try {
            let categories = await db.Category.findAll();
            let brands = await db.Brand.findAll();
            let sizes = await db.Size.findAll();
            let colors = await db.Color.findAll();

            const resultValidation = validationResult(req);

            const product = req.body;

            if (resultValidation.errors.length > 0) {
                return res.render('productos/createProduct', {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    brands,
                    colors,
                    sizes,
                    categories
                });
            }

            product.image = req.file ? req.file.filename : '';

            let productoCreado = await db.Product.create(product);

            let productImage = await db.Image.create({
                file: product.image,
                product_id: productoCreado.id
            });
            res.redirect('/')
        } catch (error) {
            console.log(error);
            return res.status(500);
        }

    },

    // Delego al modelo que busque el producto
    edit: async (req, res) => {
        try {
            const product = await db.Product.findOne({
                where: { id: req.params.id },
                include: ["category", "brand", "size", "color", "Images"]
            });
            const categories = await db.Category.findAll();
            const brands = await db.Brand.findAll();
            const sizes = await db.Size.findAll();
            const colors = await db.Color.findAll();

            const Images = await db.Image.findOne({ where: { product_id: product.id } });
            res.render('productos/editProduct', {
                product,
                categories,
                brands,
                Images,
                colors,
                sizes
            });
        } catch (error) {
            console.log(error);
            return res.status(500);
        }
    },

    // Función que realiza cambios en el producto seleccionado
    update: async (req, res) => {
        try {
            const product = await db.Product.findOne({
                where: { id: req.params.id },
                include: ["category", "brand", "size", "color", "Images"]
            });

            let categories = await db.Category.findAll();
            let brands = await db.Brand.findAll();
            let sizes = await db.Size.findAll();
            let colors = await db.Color.findAll();

            const resultValidation = validationResult(req);

            const productBody = req.body;
            const image = {};

            if (resultValidation.errors.length > 0) {
                console.log("entraste al if Errors")
                image.name = req.file ? req.file.filename : productBody.oldImagen;
                if (resultValidation.errors.image) {
                    console.log("entraste al if imageErrors")
                    image.name = productBody.oldImagen;
                }
                return res.render('productos/editProduct', {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    product,
                    brands,
                    colors,
                    sizes,
                    categories,
                    image
                });
            }

            productBody.image = req.file ? req.file.filename : productBody.oldImagen;
            if (productBody.image === undefined) {
                productBody.image = productBody.oldImagen
            };
            delete productBody.oldImagen;

            let updatedProduct = await db.Product.update({
                name: productBody.name,
                categoryId: productBody.category_id,
                brandId: productBody.brand_id,
                sizeId: productBody.size_id,
                colorId: productBody.color_id,
                description: productBody.description,
                price: productBody.price,
                stock: productBody.stock,
            },
                { where: { id: req.params.id } });

            let productImage = await db.Image.update({ 
                file: productBody.image }, {
                where: { product_id: req.params.id }
            });

            res.redirect('/products/' + req.params.id);
        } catch (error) {
            console.log(error);
            return res.status(500);
        }
    },// Función que elimina del Array visitados ek producto seleccionado
    destroy: async (req, res) => {
        let product_id = req.params.id;
        db.Product.findByPk(product_id,
            {
                include: ['Images']
            });
        await db.Image.destroy({ where: { product_id: product_id }, force: true });
        await db.Product.destroy({ where: { id: product_id }, force: true });
        return res.redirect('/products')
    },


    cart: (req, res) => {
        res.render('productos/carrito');
    },

    // search: (req, res) => {
    //     let dataABuscar = req.query.search;
    //     const filteredProducts = productModel.search(dataABuscar);
    //     // Filtrar todos los productos por los que contengan dataABuscar en el titulo y devolver una pagina con esos productos
    //     res.render('productos/listProduct', {
    //         products: filteredProducts,
    //         query: dataABuscar
    //     });
    // },
    search: async (req, res) => {
        try {
            // almaceno query de busqueda
            let { search } = req.query;
            // paso el string de busqueda a lower case
            search = search.toLowerCase();
            // busco productos que incluyan en su nombre el string de busqueda
            let products = await db.Product.findAll({
                 where: {
                    name:  {[Op.like]: `%${search}%`}
                },
                include: ["brand", "color", "size", "category", "Images"]
            })
                res.render('productos/catalogProduct', { products })
        } catch (error) {
            console.log(error);
            return res.status(500);
        }
    },

    show1: async (req, res) => {

        try {
            const product = await db.Product.findAll({
                include: [
                    "brand", "category", "Images", "size", "color"
                ]
            }

            );
            console.log(JSON.parse(JSON.stringify(product)))
            console.log(product)
            return res.render('productos/listProduct', { product });

        }
        catch (error) {
            console.log(error);

        }
    }
}

module.exports = productController
