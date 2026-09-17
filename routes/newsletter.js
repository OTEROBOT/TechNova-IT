/**
 * ============================================================================
 *  routes/newsletter.js — Newsletter & Dispatch Subscription Routes
 * ============================================================================
 */

const express = require('express');
const newsletterController = require('../controllers/newsletterController');
const { requireAdmin } = require('./middleware');

const router = express.Router();

// Public subscription endpoint
router.post('/subscribe', newsletterController.subscribe);
router.post('/', newsletterController.subscribe);

// Admin view & delete subscribers
router.get('/subscribers', requireAdmin, newsletterController.getSubscribers);
router.delete('/subscribers/:id', requireAdmin, newsletterController.deleteSubscriber);

module.exports = router;
