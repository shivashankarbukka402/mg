const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    image: { type: String, default: '' },
    packSize: { type: String, default: '' },
    stock: { type: Number, default: 100 },
    manufacturer: { type: String },
    rating: { type: Number, default: 4.5 },
    reviewCount: { type: Number, default: 0 },
    requiresPrescription: { type: Boolean, default: false },
  },
  { timestamps: true }
);

medicineSchema.index({ name: 'text', category: 'text' });

module.exports = mongoose.model('Medicine', medicineSchema);
