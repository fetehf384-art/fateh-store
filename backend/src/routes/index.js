const express = require('express');
const router = express.Router();
const products = require('./products');
const users = require('./users');
const orders = require('./orders');
const auth = require('./auth');
const uploads = require('./uploads');
const ai = require('./ai');

router.use('/products', products);
router.use('/users', users);
router.use('/orders', orders);
router.use('/auth', auth);
router.use('/uploads', uploads);
router.use('/ai', ai);

module.exports = router;
