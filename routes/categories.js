/**
 * ============================================================================
 *  routes/categories.js — Showroom Category Routes
 * ============================================================================
 */

const express = require('express');
const categoryController = require('../controllers/categoryController');
const { requireAdmin } = require('./middleware');

const router = express.Router();

router.get('/', categoryController.getAll);
router.post('/', requireAdmin, categoryController.create);
router.put('/:id', requireAdmin, categoryController.update);
router.delete('/:id', requireAdmin, categoryController.delete);

module.exports = router;
