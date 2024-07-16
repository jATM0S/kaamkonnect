const express = require("express");
const workerControllers = require("../controllers/workerControllers");
const userControllers = require("../controllers/userController");
const router = express.Router();

router
  .route("/workers/:id")
  .get(workerControllers.getWorker)
  .patch(workerControllers.updateWorker)
  .delete(workerControllers.deleteWorker);
router
  .route("/workers")
  .get(workerControllers.getWorkers)
  .post(workerControllers.createWorker);
router
  .route("/users/:id")
  .get(userControllers.getUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);
router
  .route("/users")
  .get(userControllers.getUsers)
  .post(userControllers.createUser);

module.exports = router;
