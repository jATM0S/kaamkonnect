const express = require("express");
const worker = require("./adminModel");
const catchAsync = require("./../utils/catchAsync");

// creating a worker
exports.createWorker = catchAsync(async (req, res) => {
  const newWorker = await worker.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      worker: newWorker,
    },
  });
});

// update the workerdetails
exports.updateWorker = catchAsync(async (req, res) => {
  const updateWorker = await worker.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: "sucess",
    result: "updated worker detail",
    data: {
      updateWorker,
    },
  });
});

// delete the worker
exports.deleteWorker = catchAsync(async (req, res) => {
  const updateWorker = await worker.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "sucess",
    result: "Deleted worker detail",
    data: {
      updateWorker,
    },
  });
});
