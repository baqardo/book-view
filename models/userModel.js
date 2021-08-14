const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Book = require('./bookModel.js');

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
    emailVerificationToken: {
      type: String,
      select: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    wantReadBooks: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
      },
    ],
    currentlyReadingBooks: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
      },
    ],
    haveReadBooks: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
      },
    ],
    likedBooks: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
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

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

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

userSchema.statics.createEmailVerificationToken = function () {
  const emailVerificationToken = crypto.randomBytes(32).toString('hex');
  return emailVerificationToken;
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (!this.passwordChangedAt) return false;

  const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

  return JWTTimestamp < changedTimestamp;
};

userSchema.methods.calcQuantity = async function (bookId, fieldName) {
  const stats = await User.aggregate([
    {
      $match: { [fieldName]: mongoose.Types.ObjectId(bookId) },
    },
    {
      $group: {
        _id: fieldName,
        sum: { $sum: 1 },
      },
    },
  ]);

  const quantityField = fieldName + 'Quantity';

  if (stats.length > 0)
    await Book.findByIdAndUpdate(bookId, {
      [quantityField]: stats[0].sum,
    });
  else
    await Book.findByIdAndUpdate(bookId, {
      [quantityField]: 0,
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
