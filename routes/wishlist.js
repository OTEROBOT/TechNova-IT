/**
 * ============================================================================
 *  routes/wishlist.js — Customer Curated Wishlist Routes
 * ============================================================================
 */

const express = require('express');
const wishlistController = require('../controllers/wishlistController');
const { requireLogin } = require('./middleware');

const router = express.Router();
router.use(requireLogin);

router.get('/', wishlistController.getAll);
router.post('/', wishlistController.add);
router.delete('/:productId', wishlistController.remove);

module.exports = router;
