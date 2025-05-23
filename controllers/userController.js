const express = require("express");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Users = require("../models/userModel");
const tokenUtil = require("../utils/token");

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(email, password);
  if (!email || !password) {
    return next(new AppError("Please enter email and password", 400));
  }
  const user = await Users.findOne({ email }).select("+password");
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("Email or password error"));
  }

  tokenUtil.createSendToken(user, 200, res);
});
exports.getMe = catchAsync(async (req, res, next) => {
  const findingMe = await Users.findById(req.user.id);
  if (!findingMe) {
    return next(new AppError("No user of that ID!!", 404));
  }
  res.status(200).json({
    status: "sucess",
    result: "found",
    data: {
      findingMe,
    },
  });
});
//get a user
exports.getUser = catchAsync(async (req, res, next) => {
  const findingAUser = await Users.findById(req.params.id);
  if (!findingAUser) {
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

  let query = Users.find(JSON.parse(queryStr));

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
    const numUsers = await Users.countDocuments();
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
  const newUser = await Users.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  tokenUtil.createSendToken(newUser, 201, res);
});

// update the workerdetails
exports.updateUser = catchAsync(async (req, res, next) => {
  const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
  };
  const filterBody = filterObj(req.body, "name", "email");
  const updateUser = await Users.findByIdAndUpdate(req.user.id, filterBody, {
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
  const deleteUser = await Users.findByIdAndDelete(req.params.id);
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
