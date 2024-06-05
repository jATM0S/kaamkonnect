const express = require("express");
const worker = require("./adminModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");


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
  if (!updateWorker){
    return next(new AppError('No worker of that ID!!',404))
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
  const updateWorker = await worker.findByIdAndDelete(req.params.id);
  if (!deleteWorker){
    return next(new AppError('No worker of that ID!!',404))
  }
  res.status(200).json({
    status: "sucess",
    result: "Deleted worker detail",
    data: {
      updateWorker,
    }, 
  });
});
