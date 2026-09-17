/**
 * ============================================================================
 *  routes/orders.js — Order Placement & Processing Routes
 * ============================================================================
 */

const express = require('express');
const orderController = require('../controllers/orderController');
const { requireLogin, requireAdmin } = require('./middleware');

const router = express.Router();

router.post('/', requireLogin, orderController.createOrder);
router.get('/my', requireLogin, orderController.getMyOrders);
router.get('/:id', requireLogin, orderController.getOrderById);
router.get('/', requireAdmin, orderController.getAllOrders);
router.put('/:id/status', requireAdmin, orderController.updateStatus);

module.exports = router;
