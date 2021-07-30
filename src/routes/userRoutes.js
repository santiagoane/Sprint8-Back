const express = require('express');
const router = express.Router();
const path = require('path');

const userController = require(path.resolve(__dirname,'../controllers/userController')) 

//middlewares
const uploadFile = require('../middlewares/multerUserMiddleware')
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
//Mostrar el register
router.get('/register', guestMiddleware, userController.showRegister);  

//Procesar el registro
router.post('/register', uploadFile.single('avatar'), validations, userController.processRegister);

//formulario de login
router.get('/login', userController.show);

// Procesar el login
router.post('/login', userController.loginProcess);

// Perfil de Usuario
router.get('/profile/', authMiddleware, userController.profile);

// Logout
router.get('/logout/', userController.logout);


router.get('/users/edit/:id', userController.editUserScreen);




module.exports = router;