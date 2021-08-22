const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const filterObj = require('../utils/filterObj');
const factory = require('./handlerFactory');

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(new AppError('This route is not for password updates. please use /updateMyPassword', 400));

  const filteredBody = filterObj.holdFields(req.body, 'name', 'email');

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: updatedUser,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = factory.createOne(User);
exports.updateUser = factory.updateOne(User);
exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User, {
  path: 'wantReadBooks currentlyReadingBooks haveReadBooks likedBooks',
  model: 'Book',
});
exports.deleteUser = factory.deleteOne(User);

//?Operation is either add or remove
const updateList = (operation, listName) =>
  catchAsync(async (req, res, next) => {
    const operator = operation === 'remove' ? '$pull' : '$addToSet';
    const updatedUser = await User.findOneAndUpdate(
      req.user.id,
      { [operator]: { [listName]: req.params.bookId } },
      {
        new: true,
        runValidators: true,
      }
    );

    updatedUser.calcQuantity(req.params.bookId, listName);

    res.status(200).json({
      status: 'success',
      data: updatedUser,
    });
  });

exports.addLikedBook = updateList('add', 'likedBooks');
exports.removeLikedBook = updateList('remove', 'likedBooks');
exports.addToReadBook = updateList('add', 'wantReadBooks');
exports.removeToReadBook = updateList('remove', 'wantReadBooks');
exports.addCurrentlyReadingBook = updateList('add', 'currentlyReadingBooks');
exports.removeCurrentlyReadingBook = updateList('remove', 'currentlyReadingBooks');
exports.addHaveReadBook = updateList('add', 'haveReadBooks');
exports.removeHaveReadBook = updateList('remove', 'haveReadBooks');
