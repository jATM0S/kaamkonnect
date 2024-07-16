const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userModel = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Name is necessary"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is necessary"],
    // validate: [validator.isEmail, "please provide valid email"],
  },
  password: {
    type: String,
    required: [true, "password is necessary"],
    minlength: [8, "password must be at elast 8 characters long"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "password is necessary"],
    minlength: [8, "password must be at elast 8 characters long"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords are not the same",
    },
  },
  photo: String,
});
userModel.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});
const users = mongoose.model("users", userModel);
module.exports = users;
