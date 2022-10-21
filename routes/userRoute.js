const express = require("express");
const { registerNewUser, userLogin, userLogout } = require("../controllers/userController");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();
const jwt = require("jsonwebtoken");

//User signup, login routes
router.route('/createuser').post(registerNewUser);
router.route('/login').post(userLogin);
router.route('/logout').get(userLogout);

//User authentication route, we need it because we are doing authentication via cookies...
router.route('/authenticate').post(catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Authenticatin failed!!", 401));
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);

    const user = await User.findById(decodedData.id);
    if(!user){
        return next(new ErrorHandler("Authenticatin failed!!", 401));
    }
    res.status(200).json({
        success: true,
        message: "Authenticated successfully!!"
    })
}))
module.exports = router;