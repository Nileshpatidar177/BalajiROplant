const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['ice', 'water', 'icecream'], required: true },
  retailPrice: { type: Number, required: true },
  wholesalePrice: { type: Number, required: true },
  unit: { type: String, default: 'per piece' },
  description: { type: String },
  emoji: { type: String, default: '🧊' },
  available: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
