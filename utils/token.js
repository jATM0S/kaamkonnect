const jwt = require("jsonwebtoken");

const assignToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.createSendToken = (user, statusCode, res) => {
    console.log(user);
  token = assignToken(user._id);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: user,
    },
  });
};
