const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const filterObj = require('../utils/filterObj');
const factory = require('./handlerFactory');

exports.updateUser = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj.removeFields(req.body, 'password', 'passwordConfirm');

  const updatedUser = await User.findByIdAndUpdate(req.params.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) return next(new AppError('No document found with that ID', 404));

  if (req.body.password && req.body.passwordConfirm) {
    updatedUser.password = req.body.password;
    updatedUser.passwordConfirm = req.body.passwordConfirm;
    await updatedUser.save();
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedUser,
    },
  });
});

exports.createUser = factory.createOne(User);
exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.deleteUser = factory.deleteOne(User);
