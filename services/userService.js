const User = require("../models/userModel");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require("./handlersFactory");

module.exports.getUsers = getAll(User);
module.exports.createUser = createOne(User);

module.exports.getUser = getOne(User);

// module.exports.updateUser = updateOne(User);
module.exports.deleteUser = deleteOne(User);

exports.updateUser = asyncHandler(async (req, res) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      phone: req.body.phone,
      email: req.body.email,
      profileImg: req.body.profileImg,
      role: req.body.role,
    },
    {
      new: true,
    }
  );
  if (!document)
    throw new ApiError(`No document for this id ${req.params.id}`, 404);
  res.status(200).json({ data: document });
});

exports.changeUserPassword = asyncHandler(async (req, res) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );
  if (!document)
    throw new ApiError(`No document for this id ${req.params.id}`, 404);

  res.status(200).json({ data: document });
});
