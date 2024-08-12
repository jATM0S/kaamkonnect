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
  location:{
    type:String,
    required:[true,"location of worker residence should be filled"]
  },
  price: {
    type: Number,
    required: [true, "Price must be quoted"],
  },
  availability: {
    type: [String],
  },
  skill: {
    type: String,
    required: [true, "The skill is necessary"],
  },
  description: {
    type: String,
    required: [true, "The skill description is necessary"],
  },
  experience: {
    type: String,
    required: [true, "The experience you have is necessary to put in"],
  },
  skillLevel: {
    type: String,
    required: [true, "need skill level"],
    enum: {
      values: ["skilled", "very skilled", "basic"],
      message:"Skill can be skilled, very skilled or basic only."
    },
  },
  images: {
    type: [String],
    required: [true, "The image is needed"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: [true, "Date is necessary"],
  },
});

const workers = mongoose.model("worker", workerModel);
module.exports = workers;
