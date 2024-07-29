const express = require("express");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Users = require("../models/userModel");
const { promisify } = require("util");

const assignToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.loginAuth = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  //verifying token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check if user still exists
  const user = await Users.findById(decoded.id);
  if (!user) {
    new AppError("The user belonging to this token does not exist.", 401);
  }
  req.user = user;
  next();
});

exports.restrict = (...roles) => {
  return ( req,res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have the permission for this action.", 403)
      );
    }
    next();
  };
};
