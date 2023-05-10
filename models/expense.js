const mongoose = require('mongoose');
const Schema = mongoose.Schema


const userExpense = new Schema({
    amount:{
        type: Number,
        required: true
    } ,
    description: {
        type: String,
       required: true
    },
    category: {
        type: String,
       required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('UserExpense', userExpense)