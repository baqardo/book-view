const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name!'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: {
      type: String,
      default: 'default.jpeg',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        //? Works only on CREATE and SAVE
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same',
      },
      select: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
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
        type: String, //* ISBN
      },
    ],
    currentlyReadingBooks: [
      {
        type: String, //* ISBN
      },
    ],
    haveReadBooks: [
      {
        type: String, //* ISBN
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

// tourSchema.virtual("wantToReadBooksQuantity").get(function () {});
// tourSchema.virtual("haveReadBooksQuantity").get(function () {});
// tourSchema.virtual("wantToReadPagesQuantity").get(function () {});
// tourSchema.virtual("haveReadPagesQuantity").get(function () {});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  const minuteInMilliseconds = 60 * 1000;
  this.passwordResetExpires = Date.now() + 10 * minuteInMilliseconds;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
