const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Transaction = require("../models/Transaction");
const ErrorHandler = require("../utils/ErrorHandler");


//Add a transaction.
exports.addTransaciton = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user;

    const newTransaction = await Transaction.create(req.body);

    if (!newTransaction){
        return next( new ErrorHandler("Failed to add a transaction!",400) );
    }

    res.status(201).json({
        success: true,
        newTransaction
    })
});


//Get all transaction.
exports.getAllTransaction = catchAsyncErrors(async (req, res, next) => {

    const allTransaction = await Transaction.find({ user: req.user });
    // const allTransaction = await Transaction.find();

    if (!allTransaction) {
        return next(new ErrorHandler("Failed to get transaction!",500));
    }

    res.status(200).json({
        success: true,
        allTransaction
    })
});


//Delete A transaction.
exports.deleteTransaction = catchAsyncErrors(async (req, res, next) => {

    const transactionToDelete = await Transaction.findById(req.params.id);

    if (!transactionToDelete) {
        return next(new ErrorHandler("Transaction not found",404));
    }

    await Transaction.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        message: "Transaction deleted successfully!!"
    })
});