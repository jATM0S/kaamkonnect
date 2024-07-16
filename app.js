const express = require("express");
const app = express();
const AppError = require("./utils/appError");
const globalErrorHandler=require('./utils/errorController')
app.use(express.json());

const router = require("./routers/routers");
app.use("/", router);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
