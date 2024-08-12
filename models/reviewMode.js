const mongoose = require("mongoose");
const reviewModel = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "There should be review body present,"],
  },
  rating: {
    type: Number,
    required: [true, "The no of stars should be given."],
    default: 5,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user:{
    type:mongoose.Schena.ObjectId,
    ref:'users',
    required:[true,"The user must be defind."]
  },
  worker:{
    rype:mongoose.Schema.ObjectId,
    ref:"workers",
    required:[true,'The worker to whom review is given must be specified.']
},
});
const review = mongoose.model("review", reviewModel);
module.exports = review;
