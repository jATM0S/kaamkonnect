const express = require("express");
const workerControllers = require("../controllers/workerController");
const userControllers = require("../controllers/userController");
const authControllers = require("../controllers/authController");
const router = express.Router();

router
  .route("/workers/:id")
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
router
  .route("/workers")
  .get(workerControllers.getWorkers)
  .post(
    authControllers.loginAuth,
    authControllers.restrict("admin", "worker"),
    workerControllers.createWorker
  );
router
  .route("/users/:id")
  .get(userControllers.getUser)
  .patch(authControllers.loginAuth, userControllers.updateUser)
  .delete(authControllers.loginAuth, userControllers.deleteUser);
router.route("/users").get(userControllers.getUsers);

router.post("/signUp", userControllers.createUser);
router.post("/login", userControllers.login);
router.post("/forgotPassword",authControllers)

module.exports = router;
