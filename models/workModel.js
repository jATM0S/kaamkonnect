const mongoose = require("mongoose");
const workModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A title is compulsory"],
    },

    price: {
      type: Number,
      required: [true, "Price must be quoted"],
    },
    location: {
      type: String,
      required: [true, "Location for the work must be specified"],
    },
    description: {
      type: String,
      required: [true, "Description of task is necessary"],
    },
    experience: {
      type: String,
      required: [true, "The experience you have is necessary to put in"],
    },
    skill: {
      type: String,
      required: [true, "The skill of for the work is required"],
    },
    skillLevel: {
      type: String,
      required: [true, "Need skill level"],
      enum: {
        values: ["skilled", "very skilled", "basic"],
        message: "Skills can be skilled, very skilled or basic only.",
      },
    },
    status: {
      type: String,
      required: [true, "Need status to describe the completeness of work"],
      enum: {
        values: ["pending", "accepted", "completed"],
        message: "Status of the task should be stated",
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const work = mongoose.model("works", workModel);
module.exports = work;
