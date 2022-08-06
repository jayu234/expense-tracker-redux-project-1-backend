const express = require("express");
const { body } = require("express-validator");
const { registerNewUser, userLogin, userLogout } = require("../controllers/userController");
const router = express.Router();
const User = require('../models/User');

//Router-1: Creating new user
router.route('/createuser').post(registerNewUser);
router.route('/login').post(userLogin);
router.route('/logout').get(userLogout);

module.exports = router;