const express = require('express');
const router = express.Router();
const productApiController = require('../../controllers/API/productApiController')


//Rutas

//Listado de productos
router.get('/', productApiController.list);
//Info productos
router.get('/:id', productApiController.productDetail);
//Busqueda productos
router.get('/search', productApiController.productSearch);

module.exports = router;