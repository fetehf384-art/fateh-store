const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Statistics endpoint (must be before :id route)
router.get('/stats', productController.getProductStats);

// Get all products with filtering, searching, and pagination
router.get('/', productController.getAllProducts);

// Get products by category
router.get('/category/:category', productController.getProductsByCategory);

// Get single product
router.get('/:id', productController.getProductById);

// Create new product
router.post('/', productController.createProduct);

// Update product
router.put('/:id', productController.updateProduct);

// Delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
