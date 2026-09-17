/**
 * ============================================================================
 *  routes/addresses.js — Customer Address Book Routes
 * ============================================================================
 */

const express = require('express');
const addressController = require('../controllers/addressController');
const { requireLogin } = require('./middleware');

const router = express.Router();
router.use(requireLogin);

router.get('/', addressController.getAll);
router.post('/', addressController.create);
router.put('/:id', addressController.update);
router.delete('/:id', addressController.delete);
router.put('/:id/default', addressController.setDefault);

module.exports = router;
