const { body } = require('express-validator');
const path = require('path');

const validationProduct = [
    body('name')
    .notEmpty().withMessage('Debes completar el nombre').bail()
    .isLength({ min: 2 }),
    body('price')
    .notEmpty().withMessage('Debes ingresar un precio').bail(),
    body('description')
    .notEmpty().withMessage('Debes ingresar una descripción').bail()
    .isLength({ min: 5 }),
    body('size')
    .notEmpty().withMessage('Debes seleccionar una opción'),
    body('brand')
    .notEmpty().withMessage('Debes seleccionar una opción'),
    body('color')
    .notEmpty().withMessage('Debes seleccionar una opción'),
    body('image')
    .custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg'];

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

module.exports = validationProduct;