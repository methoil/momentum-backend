const express = require('express');
const userRouter = require('./routes/userRoutes');
const habitRouter = require('./routes/habitRoutes');
require('./mongo/mongoose');

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(habitRouter);

module.exports = app;