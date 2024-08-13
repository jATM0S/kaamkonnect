const Reviews = require("../models/reviewModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


exports.createReview = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const review = await Reviews.create({
    review: req.body.review,
    rating: req.body.rating,
    reviewer: req.body.user,
    worker: req.body.worker,
  });
  if (!review) next(new AppError(401, "Required fields must be filled"));
  res.status(200).json({
    status: "sucess",
    result: "review was created",
    data: { review },
  });
});
const findReview = catchAsync(async (req, res, next) => {
  const review = await Reviews.findById();
});

exports.editReview = catchAsync(async (req, res, next) => {
  const review = await Reviews.findOneAndUpdate(req.body);
  if (!review) next(new AppError(401, "Uncessful to update review"));
  res.status(200).json({
    status: "sucess",
    result: "review was edited",
    data: { review },
  });
});

exports.deleteReveiw = catchAsync(async (req, res, next) => {
  const review = await Reviews.findOneAndDelete(req.body.reveiw_id);
  if (!review) next(new AppError(401, "There is no reveiw."));
  res
    .status(200)
    .json({
      status: "sucess",
      result: "The review was deleted",
      data: { review },
    });
});
