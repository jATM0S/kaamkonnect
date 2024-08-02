const express = require("express");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Users = require("../models/userModel");
const { promisify } = require("util");
const sendEmail = require("../utils/email");
const crypto = require("crypto");

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
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have the permission for this action.", 403)
      );
    }
    next();
  };
};

exports.forgotPassword = async (req, res, next) => {
  const user = await Users.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no use with that email address.", 404));
  }
  const resetToken = await user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/resetPassword/${resetToken}`;
  const message = `Forgot your password? submit a patch request with your new password and passwordConfirt to: ${resetURL}`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token. (valid for 10 min)",
      message,
    });
    res.status(200).json({
      status: "sucess",
      message: "token sent to email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.tokenExpiresAt = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError("Error sending email. Try again later!!"), 500);
  }
};

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.prams.token)
    .digest("hex");
  const user = Users.findOne({
    passwordResetToken: hashedToken,
    tokenExpiresAt: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError("Token isn invalid or has expired"), 404);
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.tokenExpiresAt = undefined;
  await user.save();
  assignToken(user._id);
  res.status(200).json({
    status: "sucess",
    token,
  });
});
