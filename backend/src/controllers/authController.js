const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res, next) => {
  try {
    const { phone, password, name, email } = req.body;
    const existing = await User.findOne({ phone });
    if(existing) return res.status(400).json({ error: 'phone_exists' });
    const hash = password ? await bcrypt.hash(password, 10) : undefined;
    const user = new User({ phone, password: hash, name, email });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
    res.status(201).json({ token, user: { id: user._id, phone: user.phone, role: user.role } });
  } catch (err){ next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if(!user) return res.status(400).json({ error: 'invalid_credentials' });
    if(!user.password) return res.status(400).json({ error: 'no_password' });
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) return res.status(400).json({ error: 'invalid_credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
    res.json({ token, user: { id: user._id, phone: user.phone, role: user.role } });
  } catch (err){ next(err); }
};
