const mongoose = require('mongoose');
const Book = require('../models/bookModel.js');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Please provide review'],
  },
  rating: {
    type: Number,
    required: [true, 'Please provide rating'],
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  book: {
    type: mongoose.Schema.ObjectId,
    ref: 'Book',
    required: [true, 'Review must belong to book'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user'],
  },
});

reviewSchema.statics.calcAverageRatings = async function (bookId) {
  const stats = await this.aggregate([
    {
      $match: { book: bookId },
    },
    {
      $group: {
        _id: 'book',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0)
    await Book.findByIdAndUpdate(bookId, { ratingsQuantity: stats[0].nRating, ratingsAverage: stats[0].avgRating });
  else await Book.findByIdAndUpdate(bookId, { ratingsQuantity: 0, ratingsAverage: 4.5 });
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.book);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.doc = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  if (this.doc) await this.doc.constructor.calcAverageRatings(this.doc.book);
});

const Review = new mongoose.model('Review', reviewSchema);

module.exports = Review;
