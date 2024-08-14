const express = require("express");
const authController = require("../controllers/authController");
const reviewController = require("../controllers/reviewController");
const reviewRouter = express.Router();

reviewRouter
  .route("/")
  .get(
    authController.loginAuth,
    authController.restrict("admin"),
    reviewController.findAllReview
  )
  .post(
    authController.loginAuth,
    authController.restrict("admin", "client"),
    reviewController.createReview
  );

reviewRouter
  .route("/:id")
  .patch(
    authController.loginAuth,
    authController.restrict("admin", "client"),
    reviewController.editReview
  )
  .delete(
    authController.loginAuth,
    authController.restrict("admin", "client"),
    reviewController.deleteReveiw
  );
module.exports = reviewRouter;
