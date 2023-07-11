const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (payload) => {
  const token = jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
  return token;
};

module.exports.signup = asyncHandler(async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const token = createToken(user._id);
  res.status(201).json({ data: user, token });
});

module.exports.login = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    throw new ApiError("Incorect email or password", 401);
  }

  const token = createToken(user._id);
  res.status(200).json({ data: user, token });
});

module.exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    // console.log(token);
  }

  if (!token) {
    throw new ApiError("You are not login", 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    throw new ApiError(
      "the user that belong to this token does no longer exist",
      401
    );
  }

  if (currentUser.passwordChangedAt) {
    const passwordChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    if (passwordChangedTimestamp > decoded.iat) {
      throw new ApiError(
        "User recently changed his password , please login again",
        401
      );
    }
  }
  req.user = currentUser;
  next();
});
