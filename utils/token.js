const jwt = require("jsonwebtoken");

const assignToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.createSendToken = (user, statusCode, res) => {
  token = assignToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COKIE_EXPIRES_IN * 60 * 60 * 24
    ),
    httpOnly: true,
  });
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: user,
    },
  });
};
