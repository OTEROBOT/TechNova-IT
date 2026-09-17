/**
 * ============================================================================
 *  routes/coupons.js — Promotional Discounts & Coupons Routes
 * ============================================================================
 */

const express = require('express');
const couponController = require('../controllers/couponController');
const { requireAdmin, requireLogin } = require('./middleware');

const router = express.Router();

router.get('/', requireAdmin, couponController.getAll);
router.post('/', requireAdmin, couponController.create);
router.put('/:id', requireAdmin, couponController.update);
router.delete('/:id', requireAdmin, couponController.delete);
router.post('/validate', requireLogin, couponController.validate);

module.exports = router;
