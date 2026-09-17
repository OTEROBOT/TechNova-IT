/**
 * ============================================================================
 *  routes/reviews.js — Verified Reviews & Ratings Routes
 * ============================================================================
 */

const express = require('express');
const reviewController = require('../controllers/reviewController');
const { requireLogin } = require('./middleware');

const router = express.Router();

router.get('/product/:productId', reviewController.getByProduct);
router.post('/', requireLogin, reviewController.create);
router.delete('/:id', requireLogin, reviewController.delete);

module.exports = router;
