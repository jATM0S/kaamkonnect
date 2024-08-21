const express = require("express");
const app = express();
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./utils/errorController");
const path = require('path');

app.use(express.json());

//data sanitization against query injection
app.use(mongoSanitize());
//sanitization against xss attact
app.use(xss());

//view stuff
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.get("/", (req, res) => {
  res.status(200).render("pages/base");
});

//backend routes stuff
const router = require("./routers/routers");
app.use("/", router);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
