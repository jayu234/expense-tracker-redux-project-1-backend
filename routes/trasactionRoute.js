const express = require("express");
const { addTransaciton, getAllTransaction, deleteTransaction } = require("../controllers/transactionController");
const { authenticateUser } = require("../middleware/auth");

const router = express.Router();

router.route("/transaction").get(authenticateUser, getAllTransaction );
router.route("/transaction/add").post(authenticateUser, addTransaciton );
router.route("/transaction/:id").delete(authenticateUser, deleteTransaction );

module.exports = router;