/**
 * ============================================================================
 *  routes/admin.js — Executive Dashboard & Governance Routes
 * ============================================================================
 */

const express = require('express');
const adminController = require('../controllers/adminController');
const { requireAdmin } = require('./middleware');

const router = express.Router();
router.use(requireAdmin);

router.get('/stats', adminController.getStats);
router.get('/users', adminController.getUsers);
router.post('/users', adminController.createUser);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);
router.put('/users/:id/role', adminController.updateUserRole);
router.put('/users/:id/ban', adminController.toggleUserBan);
router.delete('/subscribers/:id', adminController.deleteSubscriber);
router.get('/tags', adminController.getTagsSummary);
router.get('/campaigns/audience', adminController.getAudiencePreview);
router.post('/campaigns/send', adminController.sendMarketingCampaign);

module.exports = router;
