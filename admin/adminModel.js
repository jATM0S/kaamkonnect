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
  skillLevel:{
    type:String,
    required:[true,"need skill level"],
  },
  images:{
    type:[String],
    required:[true,"the image is needed"]
  }
});

const workers = mongoose.model("worker", workerModel);
module.exports = workers;
