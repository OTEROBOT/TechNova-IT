/**
 * ============================================================================
 *  routes/products.js — Product Catalog Routes
 * ============================================================================
 */

const express = require('express');
const productController = require('../controllers/productController');
const { requireAdmin } = require('./middleware');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/categories/all', productController.getCategories);
router.get('/:id', productController.getProductById);
router.post('/', requireAdmin, productController.createProduct);
router.put('/:id', requireAdmin, productController.updateProduct);
router.delete('/:id', requireAdmin, productController.deleteProduct);
router.delete('/:id/images/:imageId', requireAdmin, productController.deleteProductImage);

module.exports = router;
