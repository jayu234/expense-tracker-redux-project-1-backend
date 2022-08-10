const User = require("../models/User");
const { validationResult, check } = require("express-validator");
const bcrypt = require("bcryptjs");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/jwtToken");

const passParams = {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    returnScore: false,
    pointsPerUnique: 1,
    pointsPerRepeat: 0.5,
    pointsForContainingLower: 10,
    pointsForContainingUpper: 10,
    pointsForContainingNumber: 10,
    pointsForContainingSymbol: 10
}
exports.registerNewUser = catchAsyncErrors(async (req, res, next) => {

    await check('name', "Please provide a valid name!").isLength({ min: 3 }).run(req);
    await check('email', "Please provide valid email address!").isEmail().run(req);
    await check('password', "Please choose a valid password. Must be 8 characters long and contain a lowercase character, uppercase character, number, a special character from ( !, @, #, $, %, ^, &, *)").isStrongPassword(passParams).run(req);

    const customErrFormatter = ({ param, msg }) => {
        return { param: param, message: msg }
    }

    const valErrors = validationResult(req).formatWith(customErrFormatter);

    // if (!valErrors.isEmpty()) {
    //     return next(new ErrorHandler("Failed to register due to validation errors", 400));
    // }

    if (!valErrors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: valErrors.array()
        })
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return next(new ErrorHandler("User already exist. Try with another email.", 400));
    }

    const seqPwd = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: seqPwd });

    if (!user) {
        return next(new ErrorHandler("Failed to register new user due to internal server error.", 500));
    }

    sendToken(user, 201, res);
})

exports.userLogin = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please provide email and password!"));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid credentials!", 401));
    }

    const isPwdMatched = await bcrypt.compare(password, user.password);

    if (!isPwdMatched) {
        return next(new ErrorHandler("Invalid credentials!", 401));
    }

    sendToken(user, 200, res, next);
})

exports.userLogout = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logout successfully!"
    })
});