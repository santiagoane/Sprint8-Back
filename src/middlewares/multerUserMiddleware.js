const path = require('path');
const multer = require('multer');


    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/images/usuarios');
        },
 

    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now() + path.extname(file.originalname));

    }

});
const uploadFile = multer({ storage });

module.exports = uploadFile
