const { body } = require('express-validator');
const path = require('path');


module.exports = [
    body('name')
    .notEmpty().withMessage('Debes completar el nombre').bail()
    .isLength({ min: 5 }).withMessage('Debe tener un minimo de 5 caracteres'),
    body('price')
    .notEmpty().withMessage('Debes ingresar un precio').bail(),
    body('stock')
    .notEmpty().withMessage('Debes ingresar una cantidad de stock').bail()
    .isLength({ min: 1, max: 1000 }).withMessage('Debe tener un minimo de 1 y maximo de 1000 de stock'),
    body('description')
    .notEmpty().withMessage('Debes ingresar una descripción').bail()
    .isLength({ min: 20, max: 1000 }).withMessage('Debe tener un minimo de 20 y maximo de 1000 caracteres'),
    
    body('imagen')
    .custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg', '.gif'];

        if(!file){
            throw new Error('Debes cargar una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    }),
];

