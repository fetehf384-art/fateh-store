const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/aiController');

router.post('/chat', ctrl.chat);

module.exports = router;
