const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.setUserId = (req, res, next) => {
  req.body.user = req.user.id;
  next();
};

exports.checkIfBelong = catchAsync(async (req, res, next) => {
  if (req.user.role === 'admin') return next();

  const review = await Review.findById(req.params.id);
  if (!review) return next(new AppError('No document found with that ID', 404));

  if (req.user.id == review.user) return next();

  return next(new AppError('You do not have permission to perform this action', 403));
});

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review, { path: 'user' });
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
