const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "Please provide review"],
  },
  rating: {
    type: Number,
    required: [true, "Please provide rating"],
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  book: {
    type: mongoose.Schema.ObjectId, //* ISBN
    ref: "Book",
    required: [true, "Review must belong to book"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Review must belong to a user"],
  },
});

const Review = new mongoose.model("Review", reviewSchema);

module.exports = Review;
