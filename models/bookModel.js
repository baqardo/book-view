const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    OLID: {
      type: String,
      required: [true, 'Please provide book OLID'],
      unique: true,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: val => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    wantReadBooksQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    currentlyReadingBooksQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    haveReadBooksQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    likedBooksQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bookSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'book',
  localField: '_id',
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
