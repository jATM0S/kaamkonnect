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
  skill: {
    type: String,
    required: [true, "the skill is necessary"],
  },
  description: {
    type: String,
    required: [true, "the skill description is necessary"],
  },
  experience: {
    type: String,
    required: [true, "the experience you have is necessary to put in"],
  },
  skillLevel: {
    type: String,
    required: [true, "need skill level"],
    enum: {
      values: ["skilled", "very skilled", "basic"],
      message:"skilles can be skilled, very skilled or basic only."
    },
  },
  images: {
    type: [String],
    required: [true, "the image is needed"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: [true, "date is necessary"],
  },
});

const workers = mongoose.model("worker", workerModel);
module.exports = workers;
