const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  ISBN: {
    type: String,
    required: [true, 'Please provide book ISBN'],
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
  haveRead: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  wantRead: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  currentlyReading: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
