const express = require("express");
const controller = require("../controllers/adminController");
const commonControllers = require("../controllers/commonController");
const router = express.Router();

router
  .route("/:id")
  .get(commonControllers.getWorker)
  .patch(controller.updateWorker)
  .delete(controller.deleteWorker);
router
  .route("/")
  .get(commonControllers.getWorkers)
  .post(controller.createWorker);

module.exports = router;
