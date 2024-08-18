const express = require("express");
const authControllers = require("../controllers/authController");
const reviewControllers = require("../controllers/reviewController");
const reviewRouter = express.Router();

reviewRouter
  .route("/")
  .get(
    authControllers.loginAuth,
    authControllers.restrict("admin"),
    reviewControllers.findAllReview
  )
  .post(
    authControllers.loginAuth,
    authControllers.restrict("admin", "client"),
    reviewControllers.createReview
  );

reviewRouter
  .route("/:id")
  .patch(
    authControllers.loginAuth,
    authControllers.restrict("admin", "client"),
    reviewControllers.editReview
  )
  .delete(
    authControllers.loginAuth,
    authControllers.restrict("admin", "client"),
    reviewControllers.deleteReveiw
  );
reviewRouter.get(
  "/userReviews",
  authControllers.loginAuth,
  reviewControllers.userReviews
);
reviewRouter.get(
  "/workerReviews",
  authControllers.loginAuth,
  reviewControllers.workerReviews
);
module.exports = reviewRouter;
