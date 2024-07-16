const jwt = require("jsonwebtoken");
const express = require("express");
const user = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const users = require("../models/userModel");

//get a user
exports.getUser = catchAsync(async (req, res, next) => {
  const findingAUser = await user.findById(req.params.id);
  if (!findingAUserr) {
    return next(new AppError("No user of that ID!!", 404));
  }
  res.status(200).json({
    status: "sucess",  
    result: "found",
    data: {
      findingAUser,
    },
  });
});

exports.getUsers = catchAsync(async (req, res, next) => {
  // filtering
  const queryObj = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);

  // advanced filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  let query = users.find(JSON.parse(queryStr));

  // sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  }

  //pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 20;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(10);
  if (req.query.page) {
    const numUsers = await users.countDocuments();
    if (skip >= numUsers) throw new Error("this page does not exist");
  }
  // finding the workers
  const findingUsers = await query;
  res.status(200).json({
    status: "sucess",
    result: "found all the workers",
    data: {
      findingUsers,
    },
  });
});

// creating a user
exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await user.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login=(req,res,next)=>{
  const {email,password}=req.body;
  if(!email || !password){
    next(new AppError('please provide email and password',300));
  }
}
// update the workerdetails
exports.updateUser = catchAsync(async (req, res, next) => {
  const updateUser = await user.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updateUser) {
    return next(new AppError("No user of that ID!!", 404));
  }
  res.status(200).json({
    status: "sucess",
    result: "updated user detail",
    data: {
      updateUser,
    },
  });
});

// delete the user
exports.deleteUser = catchAsync(async (req, res, next) => {
  const deleteUser = await user.findByIdAndDelete(req.params.id);
  if (!deleteUser) {
    return next(new AppError("No user of that ID!!", 404));
  }
  res.status(200).json({
    status: "sucess",
    result: "Deleted user detail",
    data: {
      deleteUser,
    },
  });
});
