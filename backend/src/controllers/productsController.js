const Product = require('../models/Product');

exports.list = async (req, res, next) => {
  try {
    const q = (req.query.q || '').toString().toLowerCase();
    const cat = req.query.cat;
    let filter = {};
    if(cat) filter.cat = cat;
    if(q) filter.name = { $regex: q, $options: 'i' };
    const products = await Product.find(filter).limit(200).lean();
    res.json(products);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id).lean();
    if(!p) return res.status(404).json({ error: 'not_found' });
    res.json(p);
  } catch (err){ next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const p = new Product(req.body);
    await p.save();
    res.status(201).json(p);
  } catch (err){ next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!p) return res.status(404).json({ error: 'not_found' });
    res.json(p);
  } catch (err){ next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err){ next(err); }
};
