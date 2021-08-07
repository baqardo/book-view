const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: {
    type: String,
    default: "default.jpeg",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    select: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    default: "user",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  wantToReadBooks: [
    {
      type: mongoose.Schema.ObjectId, //* ISBN
      ref: "Books",
    },
  ],
  currentlyReadingBooks: [
    {
      type: mongoose.Schema.ObjectId, //* ISBN
      ref: "Books",
    },
  ],
});

// tourSchema.virtual("wantToReadBooksQuantity").get(function () {});
// tourSchema.virtual("haveReadBooksQuantity").get(function () {});
// tourSchema.virtual("wantToReadPagesQuantity").get(function () {});
// tourSchema.virtual("haveReadPagesQuantity").get(function () {});

const User = mongoose.model("User", userSchema);

module.exports = User;
