const mongoose = require("mongoose");
const workerModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A name is compulsory"],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "price must be quoted"],
  },
  availability: {
    type: [String],
  },
  skills: {
    type: [String],
    required: [true, "the skill is necessary"],
  },
});

const workers = mongoose.model("worker", workerModel);
module.exports = workers;
