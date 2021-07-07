// Dependencias
const express = require('express');
const router = express.Router();

// Controllers
const adminController = require('../controllers/adminController');

router.get('', adminController.admin);

router.get('/products', adminController.adminProducts);

router.get('/users', adminController.adminUsers);



module.exports = router