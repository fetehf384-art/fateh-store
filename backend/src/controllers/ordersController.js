const Order = require('../models/Order');
const Product = require('../models/Product');

exports.list = async (req, res, next) => {
  try {
    // if user is admin list all, else only their own
    if(req.user && req.user.role === 'admin'){
      const orders = await Order.find().populate('customer').sort('-createdAt').lean();
      return res.json(orders);
    }
    if(req.user){
      const orders = await Order.find({ customer: req.user.id }).populate('customer').lean();
      return res.json(orders);
    }
    return res.status(401).json({ error: 'unauthorized' });
  } catch (err){ next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { items, customer, guestCustomer } = req.body;
    // compute total
    let total = 0;
    const populatedItems = [];
    for(const it of items){
      let product = null;
      try { product = await Product.findById(it.product); } catch(e){}
      const price = it.price || (product ? product.price : 0);
      const name = it.name || (product ? product.name : 'Unknown');
      const qty = it.qty || 1;
      total += price * qty;
      populatedItems.push({ product: product ? product._id : null, name, qty, price });
    }
    const order = new Order({ items: populatedItems, total, status: 'pending' });
    if(req.user) order.customer = req.user.id;
    if(guestCustomer) order.guestCustomer = guestCustomer;
    await order.save();
    res.status(201).json(order);
  } catch (err){ next(err); }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if(!order) return res.status(404).json({ error: 'not_found' });
    order.status = req.body.status || order.status;
    await order.save();
    res.json(order);
  } catch (err){ next(err); }
};
