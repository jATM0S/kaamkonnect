const express = require("express");
const workerControllers = require("../controllers/workerController");
const userControllers = require("../controllers/userController");
const authControllers=require("../controllers/authController")
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
  .get(authControllers.loginAuth,userControllers.getUsers)
  .post(userControllers.createUser);
// router.route("/users/login").post(userControllers.login);

module.exports = router;
