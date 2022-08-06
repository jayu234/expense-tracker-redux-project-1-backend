const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    if (err.name === "ValidationError") {
        const validationErrs = [];
        (err.errors.summary) && (validationErrs.push(err.errors.summary.message));
        (err.errors.amount) && (validationErrs.push(err.errors.amount.message));
        (err.errors.type) && (validationErrs.push(err.errors.type.message));
        return res.status(400).json({
            success: false,
            message: "Failed to add new transaction!",
            errors: validationErrs,
        })
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        // errors: err
    })
}