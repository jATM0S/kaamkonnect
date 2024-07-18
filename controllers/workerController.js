const { json } = require("express");
const worker = require("../models/workerModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// creating a worker
exports.createWorker = catchAsync(async (req, res, next) => {
  const newWorker = await worker.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      worker: newWorker,
    },
  });
});

// update the workerdetails
exports.updateWorker = catchAsync(async (req, res, next) => {
  const updateWorker = await worker.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updateWorker) {
    return next(new AppError("No worker of that ID!!", 404));
  }
  res.status(200).json({
    status: "sucess",
    result: "updated worker detail",
    data: {
      updateWorker,
    },
  });
});

// delete the worker
exports.deleteWorker = catchAsync(async (req, res, next) => {
  const deleteWorker = await worker.findByIdAndDelete(req.params.id);
  if (!deleteWorker) {
    return next(new AppError("No worker of that ID!!", 404));
  }
  res.status(200).json({
    status: "sucess",
    result: "Deleted worker detail",
    data: {
      deleteWorker,
    },
  });
});

// getting all the workers with filtering and sorting and pagination
exports.getWorkers = catchAsync(async (req, res, next) => {
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
exports.getWorker = catchAsync(async (req, res, next) => {
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
