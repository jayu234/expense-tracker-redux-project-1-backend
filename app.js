const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const app = express();
app.use(cors())

app.use(express.json());
app.use(cookieParser());

const errorMiddleware = require("./middleware/error"); 
const trasactionsRutes = require('./routes/trasactionRoute');
const userRoutes = require('./routes/userRoute');

app.use('/api/v1/', trasactionsRutes);
app.use('/api/v1/', userRoutes);
app.use(errorMiddleware);

module.exports = app;