const mongoose = require("mongoose");

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
    validate: [validator.isEmail, "please provide valid email"],
    password: {
      string: String,
      required: [true, "password is necessary"],
      minlength: 8,
    },
    passwordconfirm: {
      string: String,
      required: [true, "password is necessary"],
    },
    photo: String,
  },
});