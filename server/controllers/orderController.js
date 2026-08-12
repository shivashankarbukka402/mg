const Order = require('../models/Order');

// @route POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, deliveryAddress } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }
    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      deliveryAddress,
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @route GET /api/orders/my
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/orders (admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route PUT /api/orders/:id/status (admin)
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.status = req.body.status || order.status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus };
