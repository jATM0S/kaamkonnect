const express = require("express");
const worker = require("./adminModel");

// creating a worker
exports.createWorker = async (req, res) => {
  try {
    const newWorker = await worker.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        worker: newWorker,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed to create worker",
      message: err.message,
    });
  }
};

// update the workerdetails
exports.updateWorker = async (req, res) => {
  try {
    const updateWorker = await worker.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json({
      status: "sucess",
      result: "updated worker detail",
      data: {
        updateWorker,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// delete the worker
exports.deleteWorker = async (req, res) => {
  try {
    const updateWorker = await worker.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status: "sucess",
      result: "Deleted worker detail",
      data: {
        updateWorker,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};