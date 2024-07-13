const express = require("express");
// const controller = require("../controllers/adminController");
const workerControllers = require("../controllers/workerControllers");
const router = express.Router();

router
  .route("/:id")
  .get(workerControllers.getWorker)
  .patch(workerControllers.updateWorker)
  .delete(workerControllers.deleteWorker);
router
  .route("/")
  .get(workerControllers.getWorkers)
  .post(workerControllers.createWorker);

module.exports = router;
