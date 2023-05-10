const Razorpay = require('razorpay');
const Order = require('../models/order');
require('dotenv').config();


exports.purchaseMembership = async (req, res, next) => {
  try {
    const rzp = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET
    });
    const amount = 1500;

    const order = await rzp.orders.create({ amount, currency: "INR" });

    const newOrder = new Order({
      orderid: order.id,
      status: "PENDING"
    });

    await newOrder.save();

    // await req.user.orders.push(newOrder);
    await req.user.save();
    // console.log(order)
    return res.status(201).json({ order, key_id: rzp.key_id });
  } catch (err) {
    res.status(403).json({ message: 'something went wrong', error: err });
  }
};



exports.transactionUpdate = async (req, res, next) => {
  try {
    const { payment_id, order_id } = req.body;
    const order = await Order.findOne({ orderid: order_id });

    const promise1 = order.updateOne({ paymentid: payment_id, status: "SUCCESSFUL" });
    const promise2 = req.user.updateOne({ isPremiumUser: true });

    Promise.all([promise1, promise2]).then(() => {
      return res.status(202).json({ success: true, message: "Transaction Successful" });
    }).catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

  

exports.failTransactionUpdate = async (req, res, next) => {
  try {
    console.log(req.body.order_id);
    const { payment_id, order_id } = req.body;
    const order = await Order.findOne({ orderid: order_id });
    await order.updateOne({ paymentid: payment_id, status: "FAILED" });
    return res.status(403).json({ message: 'Transaction Failed' });
  } catch (err) {
    console.log(err);
  }
};

