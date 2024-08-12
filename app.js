const express = require("express");
const app = express();
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./utils/errorController");
app.use(express.json());

//data sanitization against query injection
app.use(mongoSanitize());
//sanitization against xss attact
app.use(xss());
 
const router = require("./routers/routers");
app.use("/", router);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
