const worker = require("./admin/adminModel");

// getting all the workers
exports.getWorkers = async (req, res) => {
    try {
      const findingWorkers = await worker.find();
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