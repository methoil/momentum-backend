const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const habitRouter = require("./routes/habitRoutes");
require("./mongo/mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(habitRouter);

app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

module.exports = app;
