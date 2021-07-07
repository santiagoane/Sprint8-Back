//const productModel = require('../models/productsModel');


module.exports = {
    home: (req, res) => {
        res.render('home')
    },
    login: (req, res) => {
        res.render('users/login')
    },
    register: (req, res) => {
        res.render('users/register')
    }
};