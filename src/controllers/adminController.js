// ESTO SERIA EL GESTOR DEL MODELO
const productsDB = require('../model/jsonDatabase');




// Maneja todos los métodos para PRODUCTO, que lo pasa como parámetro
const productModel = productsDB('../data/products01');
const productData = productsDB('../data/users');

// Modelo de usuarios
const userModel = require('../model/userModel');


module.exports = {
    admin: (req, res) => {
        res.redirect('/admin/products')
    },
    adminProducts: (req, res) => {
        const products = productModel.all();
        const productsAmount = products.length;
        const usersAmount = userModel.findAll().length;
        res.render('backoffice/adminProductos', {
            products: products,
            productsAmount: productsAmount,
            usersAmount: usersAmount
        });
    },
    adminUsers: (req,res) => {
        const users = userModel.findAll();
        const usersAmount = users.length;
        const productsAmount = productModel.all().length;
        res.render('backoffice/adminUsers', {
            users: users,
            productsAmount: productsAmount,
            usersAmount : usersAmount,
        });
    }
};