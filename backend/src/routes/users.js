const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authMiddleware, adminOnly } = require('../middlewares/auth');

// list users (admin)
router.get('/', authMiddleware, adminOnly, async (req,res,next)=>{
  try{ const users = await User.find().lean(); res.json(users); }catch(err){next(err);} 
});

module.exports = router;
