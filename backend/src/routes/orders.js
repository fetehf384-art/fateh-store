const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ordersController');
const { authMiddleware, adminOnly } = require('../middlewares/auth');

router.get('/', authMiddleware, ctrl.list);
router.post('/', ctrl.create); // allow guest orders
router.put('/:id/status', authMiddleware, adminOnly, ctrl.updateStatus);

module.exports = router;
