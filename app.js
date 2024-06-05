const express = require("express");
const app = express();
const AppError = require("./utils/appError");
const globalErrorHandler=require('./utils/errorController')
app.use(express.json());

const router = require("./admin/routers");
app.use("/admin", router);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
