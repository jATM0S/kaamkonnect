const express = require("express");
const userControllers = require("../controllers/userController");
const authControllers = require("../controllers/authController");
const workersRouter = require("./workersRouter");
const usersRouter = require("./userRouter");
const workRouter = require("./workRouter");
const reviewRouter = require("./reviewRouter");
const router = express.Router();

router.use("/workers", workersRouter);

router.use("/users", usersRouter);

router.use("/work", workRouter);

router.use("/review", reviewRouter);

router.patch(
  "/updatePassword",
  authControllers.loginAuth,
  authControllers.updatePassword
);
router.post("/signUp", userControllers.createUser);
router.post("/login", userControllers.login);
router.post("/forgotPassword", authControllers.forgotPassword);
router.patch("/resetPassword/:token", authControllers.resetPassword);
module.exports = router;
