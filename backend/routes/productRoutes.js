const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');



// add product
router.post('/create', productController.createProduct);

// get all products
router.get('/list', productController.getAllProducts);

// edit product
router.put('/update/:productId', productController.updateProduct);

// remove product
router.delete('/delete/:productId', productController.deleteProduct);




module.exports = router;
