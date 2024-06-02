const express = require("express");
const controller = require("./adminController");
const router = express.Router();

router
  .route("/:id")
  .get(controller.getWorker)
  .patch(controller.updateWorker)
  .delete(controller.deleteWorker);
router.route("/").get(controller.getWorkers).post(controller.createWorker);

module.exports = router;
