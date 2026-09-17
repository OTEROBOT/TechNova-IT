/**
 * ============================================================================
 *  routes/auth.js — Authentication & Account Routes
 * ============================================================================
 */

const express = require('express');
const authController = require('../controllers/authController');
const { requireLogin } = require('./middleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', authController.getMe);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.put('/change-password', requireLogin, authController.changePassword);
router.put('/profile', requireLogin, authController.updateProfile);

module.exports = router;
