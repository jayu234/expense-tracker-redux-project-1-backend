const mongoose = require('mongoose');
// const validator = require('validator');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"]
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        // validate: [validator.isEmail, "Please enter valid email"]
    },
    password: {
        type: String,
        required: [true, "Please provide valid password"],
        select: false,
        minlength: 8
    },
    // resetPasswordToken: String,
    // resetPasswordExpire: Date
});


const User = mongoose.model('users', UserSchema);

module.exports = User;