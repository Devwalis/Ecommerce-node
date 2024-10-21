const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

//Rota para obter todos os produtos
router.get('/products', productController.getProducts);
module.exports = router;