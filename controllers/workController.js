const { json } = require("express");
const work = require("../models/workModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// creating a work
exports.createWork = catchAsync(async (req, res, next) => {
  const newWork = await work.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      work: newWork,
    },
  });
});

// update the workerdetails
exports.updateWork = catchAsync(async (req, res, next) => {
  const updateWork = await work.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updateWork) {
    return next(new AppError("No work of that ID!!", 404));
  }
  res.status(200).json({
    status: "sucess",
    result: "updated work detail",
    data: {
      updateWork,
    },
  });
});

// delete the work
exports.deleteWork = catchAsync(async (req, res, next) => {
  const deleteWork = await work.findByIdAndDelete(req.params.id);
  if (!deleteWork) {
    return next(new AppError("No work of that ID!!", 404));
  }
  res.status(200).json({
    status: "sucess",
    result: "Deleted work detail",
    data: {
      deleteWork,
    },
  });
});

// getting all the workers with filtering and sorting and pagination
exports.getWorks = catchAsync(async (req, res, next) => {
  // filtering
  const queryObj = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);

  // advanced filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  let query = work.find(JSON.parse(queryStr));

  // sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  }

  //pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 20;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(10);
  if (req.query.page) {
    const numWork = await work.countDocuments();
    if (skip >= numWork) throw new Error("this page does not exist");
  }
  // finding the workers
  const findingWork = await query;
  res.status(200).json({
    status: "sucess",
    result: "found all the work",
    data: {
      findingWork,
    },
  });
});

// get an work
exports.getWork = catchAsync(async (req, res, next) => {
  const findingAWork = await work.findById(req.params.id);
  if (!findingAWork) {
    return next(new AppError("No work of that ID!!", 404));
  }
  res.status(200).json({
    status: "sucess",
    result: "found",
    data: {
      findingAWork,
    },
  });
});
