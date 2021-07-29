const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");



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
            console.log(product.images);
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

            const product = req.body;

            product.image = req.file ? req.file.filename : '';

            let productoCreado = await db.Product.create(product);

            let productImage = await Images.create({
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
                where: {id : req.params.id}, 
                include: ["category", "brand", "size", "color", "Images"]
            });
            
            let categories = await db.Category.findAll();
            let brands = await db.Brand.findAll();
            let sizes = await db.Size.findAll();
            let colors = await db.Color.findAll();

            const productBody = req.body;

            const image = {};

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
                {where: { id: req.params.id }});

            let productImage = await db.Image.update({name: productBody.image},{
                    where: {productId: req.params.id}});

            res.redirect('/products/' + req.params.id);
        } catch (error) {
            console.log(error);
            return res.status(500);
        }
    },
    // update: (req, res) => {
    //     let product = req.body;
    //     console.log('product');
    //     product.id = req.params.id;

    //     product.imagen = req.file ? req.file.filename : req.body.oldImagen;

    //     if (req.body.imagen === undefined) {
    //         product.imagen = product.oldImagen
    //     }

    //     console.log('.......MOSTRA LA IMAGEN.......')
    //     console.log(product.imagen)
    //     console.log(product)


    //     // Elimino de la estructura auxiliar, porque no existe en Json 
    //     delete product.oldImagen;


    //     // Delego la responsabilidad al modelo que actualice
    //     productModel.update(product);



    //     res.redirect('/products/' + product.id)
    // },

    // Función que elimina del Array visitados ek producto seleccionado
    destroy: (req, res) => {
        console.log('entre destroy')
        productModel.delete(req.params.id);

        // Ahora se mostrará todo porque los productos los varga de un archivo
        res.redirect('/')
    },
    destroy: async (req, res) => {
        let deletedProduct = await db.Product.destroy({where: {id : req.params.id}});
        res.redirect('/')
    },


    cart: (req, res) => {
        res.render('productos/carrito');
    },

    search: (req, res) => {
        let dataABuscar = req.query.search;
        const filteredProducts = productModel.search(dataABuscar);
        // Filtrar todos los productos por los que contengan dataABuscar en el titulo y devolver una pagina con esos productos
        res.render('productos/listProduct', {
            products: filteredProducts,
            query: dataABuscar
        });
    },

    // show1: (req, res) => {

    //     const products = productModel.all();

    //     res.render('productos/listProduct', { products });


    // }


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
