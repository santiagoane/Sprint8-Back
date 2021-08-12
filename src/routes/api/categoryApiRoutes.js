const express = require('express');
const router = express.Router();
const categoryApiController = require('../../controllers/API/categoryApiController');

router.get('/', categoryApiController.list);

module.exports = router;