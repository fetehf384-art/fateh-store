const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  emoji: { type: String },
  price: { type: Number, required: true },
  orig: { type: Number },
  platform: { type: String },
  cat: { type: String, index: true },
  rating: { type: Number, default: 0 },
  sales: { type: Number, default: 0 },
  hot: { type: Boolean, default: false },
  images: [{ url: String, public_id: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
