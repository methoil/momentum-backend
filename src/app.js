const express = require('express');
const userRouter = require('./routes/userRoutes');
require('./mongo/mongoose');

const app = express();
app.use(express.json());
app.use(userRouter);

module.exports = app;