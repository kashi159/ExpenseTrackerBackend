const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const order = new Schema({
    paymentid: String,
    orderid: String,
    status: String
})

module.exports = mongoose.model('Order', order);