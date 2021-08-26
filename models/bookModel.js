const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    OLID: {
      type: String,
      required: [true, 'Please provide book OLID'],
      unique: true,
    },
    coverID: {
      type: String,
      required: [true, 'Please provide book cover ID'],
    },
    title: {
      type: String,
      required: [true, 'Please provide book title'],
    },
    author: {
      type: String,
      required: [true, 'Please provide book author'],
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
    wantRead: {
      type: Number,
      default: 0,
      min: 0,
    },
    currentlyReading: {
      type: Number,
      default: 0,
      min: 0,
    },
    haveRead: {
      type: Number,
      default: 0,
      min: 0,
    },
    likes: {
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
