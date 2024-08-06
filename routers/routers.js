const express = require("express");
const userControllers = require("../controllers/userController");
const authControllers = require("../controllers/authController");
const workersRouter = require("./workersRouter");
const usersRouter = require("./userRouter");
const router = express.Router();

router.use("/workers", workersRouter);

router.use("/users", usersRouter);

router
  .post("/updatePassword")
  .patch(authControllers.loginAuth, authControllers.updatePassword);
router.post("/signUp", userControllers.createUser);
router.post("/login", userControllers.login);
router.post("/forgotPassword", authControllers.forgotPassword);
router.patch("/resetPassword/:token", authControllers.resetPassword);
module.exports = router;
