const { json } = require("express");
const worker = require("./admin/adminModel");

// getting all the workers with filtering and sorting and pagination
exports.getWorkers = async (req, res) => {
  try {
    // filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // console.log(JSON.parse(queryStr));
    let query = worker.find(JSON.parse(queryStr));
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
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
  } catch (err) {
    res.status(404).json({
      status: "failed to get the worker detail",
      message: err.message,
    });
  }
};

// get an worker
exports.getWorker = async (req, res) => {
  try {
    const findingAWorker = await worker.findById(req.params.id);
    res.status(200).json({
      status: "sucess",
      result: "found",
      data: {
        findingAWorker,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed to get the worker detail",
      message: err.message,
    });
  }
};

//filtering workers
