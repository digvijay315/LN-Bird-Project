const mongoose = require('mongoose');

const order = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobileNumber: String,
  apartmentNumber: String,
  apartmentName: String,
  area: String,
  landmark: String,
  addressType: String,
  pincode: String,
  cartItems: [
    {
      product_name: String,
      product_price: Number,
      product_quantity: Number,
    },
  ],
  totalPrice: Number,
  setDefault: Boolean,
  payment_status:String,
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', order);

module.exports = Order;
