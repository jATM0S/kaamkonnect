const express = require("express");
const app = express();
const AppError = require("./utils/errorHandler");
const globalErrorHandler = require("./utils/globalErrorHandler");
app.use(express.json());

const router = require("./admin/routers");
app.use("/admin", router);

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
