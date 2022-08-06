const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors")
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authenticateUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please login to access the resources!!", 401));
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
})