const Order = require('../Modals/order');

// Create Order
const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const order = new Order(orderData);
    await order.save();
    res.status(201).json({ message: 'Order created successfully!', order });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

// Get All Orders (for admin panel)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

module.exports = { createOrder, getAllOrders };
