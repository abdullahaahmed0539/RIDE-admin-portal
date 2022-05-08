const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user');
const requestRouter = require("./routes/requests");

const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
app.use("/requests", requestRouter);

module.exports = app;
