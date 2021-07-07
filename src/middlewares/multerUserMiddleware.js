const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../public/images/usuarios'),
    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now() + path.extname(file.originalname));
    }
});
const uploadFile = multer({ storage });

module.exports = uploadFile
