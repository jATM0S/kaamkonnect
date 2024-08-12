const express = require("express");
const workRouter = express.Router();
const workControllers = require("../controllers/workController");
const authControllers = require("../controllers/authController");

workRouter
  .route("/:id")
  .get(workControllers.getWork)
  .patch(
    authControllers.loginAuth,
    authControllers.restrict("admin", "client"),
    workControllers.updateWork
  )
  .delete(
    authControllers.loginAuth,
    authControllers.restrict("admin", "client"),
    workControllers.deleteWork
  );
workRouter
  .route("/")
  .get(workControllers.getWorks)
  .post(
    authControllers.loginAuth,
    authControllers.restrict("admin", "client"),
    workControllers.createWork
  );
module.exports = workRouter;
