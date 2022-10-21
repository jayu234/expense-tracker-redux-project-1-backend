const jwt = require("jsonwebtoken");
const ErrorHandler = require("./ErrorHandler");

const sendToken = (user, statuscode, res, next) => {

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    res.cookie("token", token, options).status(statuscode).json({
        success: true,
        token: token
    })
}

module.exports = sendToken