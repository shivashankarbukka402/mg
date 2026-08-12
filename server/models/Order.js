const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
  name: String,
  price: Number,
  quantity: { type: Number, required: true, default: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    deliveryAddress: { type: String, required: true },
    status: {
      type: String,
      enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Processing',
    },
    paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
