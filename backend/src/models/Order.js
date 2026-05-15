const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, name: String, qty: Number, price: Number }],
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  guestCustomer: { name: String, phone: String, address: String },
  status: { type: String, enum: ['pending','processing','shipped','delivered','cancelled'], default: 'pending' },
  total: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
