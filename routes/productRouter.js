const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.post('/getProducts', productController.getProducts);

router.post('/findProduct', productController.findProduct);

router.post('/createProduct', productController.createProduct);

module.exports = router;
