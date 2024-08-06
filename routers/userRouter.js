const express = require("express");
const userControllers = require("../controllers/userController");
const authControllers = require("../controllers/authController");
const usersRouter = express.Router();

usersRouter
  .route("/:id")
  .get(userControllers.getUser)
  .patch(authControllers.loginAuth, userControllers.updateUser)
  .delete(authControllers.loginAuth, userControllers.deleteUser);
usersRouter.route("/").get(userControllers.getUsers);

module.exports = usersRouter;
