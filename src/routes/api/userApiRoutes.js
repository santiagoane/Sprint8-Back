const express = require('express');
const router = express.Router();
const userApiController = require('../../controllers/API/userApiController');

//Rutas

//Listado de usuarios
router.get('/', userApiController.list);
//Info usuario
router.get('/:id', userApiController.info);

module.exports = router;