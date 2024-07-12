const { json } = require("express");
const worker = require("../models/adminModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// getting all the workers with filtering and sorting and pagination
exports.getWorkers = catchAsync(async (req, res,next) => {
  // filtering
  const queryObj = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);

  // advanced filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  let query = worker.find(JSON.parse(queryStr));

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
    const numWorkers = await worker.countDocuments();
    if (skip >= numWorkers) throw new Error("this page does not exist");
  }
  // finding the workers
  const findingWorkers = await query;
  res.status(200).json({
    status: "sucess",
    result: "found all the workers",
    data: {
      findingWorkers,
    },
  });
});

// get an worker
exports.getWorker = catchAsync(async (req, res,next) => {
  const findingAWorker = await worker.findById(req.params.id);
  if (!findingAWorker) {
    return next(new AppError("No worker of that ID!!", 404));
  }
  res.status(200).json({
    status: "sucess",
    result: "found",
    data: {
      findingAWorker,
    },
  });
});
