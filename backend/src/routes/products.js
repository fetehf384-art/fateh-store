const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productsController');
const { authMiddleware, adminOnly } = require('../middlewares/auth');

router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.post('/', authMiddleware, adminOnly, ctrl.create);
router.put('/:id', authMiddleware, adminOnly, ctrl.update);
router.delete('/:id', authMiddleware, adminOnly, ctrl.remove);

module.exports = router;
