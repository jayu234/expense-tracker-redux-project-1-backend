const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransactionSchema = new Schema({
    
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide useId"]
    },
    summary: {
        type: String,
        required: [true, "Please provide summary of transaction"]
    },

    amount: {
        type: Number,
        required: [true,"Please provide amount of the transaction"]
    },

    type: {
        type: String,
        required: [true,"Please provide type of the transaction"]
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Transaction = mongoose.model('transactions', TransactionSchema);

module.exports = Transaction;