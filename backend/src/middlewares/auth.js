const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if(!auth) return next();
  const parts = auth.split(' ');
  if(parts.length !== 2) return next();
  const token = parts[1];
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, role: payload.role };
  }catch(e){ /* ignore invalid token */ }
  return next();
};

exports.requireAuth = (req,res,next)=>{
  if(!req.user) return res.status(401).json({ error: 'unauthorized' });
  next();
};

exports.adminOnly = (req,res,next)=>{
  if(!req.user || req.user.role !== 'admin') return res.status(403).json({ error: 'forbidden' });
  next();
};
