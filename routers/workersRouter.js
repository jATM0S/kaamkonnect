const express = require("express");
const authControllers = require("../controllers/authController");
const workerControllers = require("../controllers/workerController");
const workersRouter = express.Router();

workersRouter
  .route("/:id")
  .get(workerControllers.getWorker)
  .patch(
    authControllers.loginAuth,
    authControllers.restrict("admin", "worker"),
    workerControllers.updateWorker
  )
  .delete(
    authControllers.loginAuth,
    authControllers.restrict("admin", "worker"),
    workerControllers.deleteWorker
  );
workersRouter
  .route("/")
  .get(workerControllers.getWorkers)
  .post(
    authControllers.loginAuth,
    authControllers.restrict("admin", "worker"),
    workerControllers.createWorker
  );
  module.exports= workersRouter;
