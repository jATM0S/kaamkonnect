const Reviews = require("../models/reviewModel");
const Workers = require("../models/workerModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const ratingRecalculate = async (review) => {
  let reviews = await Reviews.find({ worker: review.worker });
  console.log(review);
  if (!reviews) return;
  console.log(reviews);
  let average = 0;
  for (let i = 0; i < reviews.length; i++) {
    average += reviews[i].rating; // Access the rating field of each review object
  }
  average /= reviews.length;
  average = parseFloat(average.toFixed(1));
  console.log(average);
  const worker = await Workers.findByIdAndUpdate(review.worker, {
    rating: average,
  });
  return;
};
exports.createReview = catchAsync(async (req, res, next) => {
  const review = await Reviews.create({
    review: req.body.review,
    rating: req.body.rating,
    reviewer: req.body.user,
    worker: req.body.worker,
  });
  if (!review) next(new AppError(401, "Required fields must be filled"));
  ratingRecalculate(review);
  res.status(200).json({
    status: "sucess",
    result: "review was created",
    data: { review },
  });
});
exports.findAllReview = catchAsync(async (req, res, next) => {
  const review = await Reviews.find();
  res.status(200).json({
    staus: "sucess",
    result: "all reviews were found",
    data: { review },
  });
});

//get reviews of worker or reviews by user
exports.workerReviews = catchAsync(async (req, res, next) => {
  const reviews = await Reviews.find({ worker: req.user.id });
  if (!reviews) next(new AppError("No reviews for this worker", 404));
  res.status(200).json({
    status: "sucess",
    message: "reviews found.",
    data: { reviews },
  });
});
exports.userReviews = catchAsync(async (req, res, next) => {
  const reviews = await Reviews.find({ reviewer: req.user.id });
  if (!reviews) next(new AppError("no reviews by this user", 404));
  res.status(200).json({
    status: "sucess",
    message: "reviews by the reviews were found.",
    data: { reviews },
  });
});

//update reviews
exports.editReview = catchAsync(async (req, res, next) => {
  const review = await Reviews.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!review) next(new AppError(401, "Uncessful to update review"));
  ratingRecalculate(review);
  res.status(200).json({
    status: "sucess",
    result: "review was edited",
    data: { review },
  });
});

exports.deleteReveiw = catchAsync(async (req, res, next) => {
  const review = await Reviews.findOneAndDelete(req.body.reveiw_id);
  if (!review) next(new AppError(401, "There is no reveiw."));
  ratingRecalculate(review);
  res.status(200).json({
    status: "sucess",
    result: "The review was deleted",
    data: { review },
  });
});
