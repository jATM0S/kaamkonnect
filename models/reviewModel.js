const mongoose = require("mongoose");

const reviewModel = new mongoose.Schema({
  review: String,
  rating: {
    type: Number,
    required: [true, "The no of stars should be given."],
    default: 5,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reviewer: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: [true, "The user must be defind."],
  },
  worker: {
    type: mongoose.Schema.ObjectId,
    ref: "worker",
    required: [true, "The worker to whom review is given must be specified."],
  },
});
reviewModel.index({ reviewer: 1, worker: 1 }, { unique: true });
reviewModel.pre(/^find/, function (next) {
  this.populate({
    path: "reviewer",
    select: "name photo",
  }).populate({
    path: "worker",
    select: "name",
  });
  next();
});
const review = mongoose.model("review", reviewModel);
module.exports = review;
