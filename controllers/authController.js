const { promisify } = require('util');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const filterObj = require('../utils/filterObj');
const Email = require('../utils/email');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const dayInMilliseconds = 24 * 60 * 60 * 1000;
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_EXPIRES_IN * dayInMilliseconds),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: user,
  });
};

exports.signup = catchAsync(async (req, res) => {
  const filteredBody = filterObj.holdFields(req.body, 'name', 'email', 'password', 'passwordConfirm');
  filteredBody.emailVerificationToken = User.createEmailVerificationToken();

  const newUser = await User.create(filteredBody);
  newUser.emailVerificationToken = undefined;

  const verificationUrl = `${req.protocol}://${req.get('host')}/api/v1/users/verifyEmail/${
    filteredBody.emailVerificationToken
  }`;
  await new Email(newUser, verificationUrl).sendEmailVerification();

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next(new AppError('Please provide email and password', 400));

  const user = await User.findOne({ email, active: { $ne: false } }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Incorrect email or password', 401));

  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'logged out', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError('There is no user with this email address', 404));

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

    await new Email(user, resetUrl).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError('There was an error sending the email. Try again later!', 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) return next(new AppError('Token is invalid or has expired', 400));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password)))
    return next(new AppError('Your current password is wrong', 401));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    token = req.headers.authorization.split(' ')[1];
  else if (req.cookies.jwt) token = req.cookies.jwt;

  if (!token) return next(new AppError('You are not logged in! Please log in to get access.', 401));

  //* Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //* Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) return next(new AppError('The user belonging to this token does no longer exist.', 401));

  //* Check if user password changed after token was issued
  if (currentUser.changedPasswordAfter(decoded.iat))
    return next(new AppError('User recently changed password! Please log in again.', 401));

  //* Grant access to protected route
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError('You do not have permission to perform this action', 403));

    next();
  };
};

exports.verified = (req, res, next) => {
  if (req.user.verified) return next();

  const url = `${req.protocol}://${req.get('host')}/api/v1/users/sendVerificationEmail`;
  next(
    new AppError(
      `Please verify your email address. If you didn't get email with verification link please use path: ${url}`
    )
  );
};

exports.verifyEmail = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ emailVerificationToken: req.params.token });
  if (!user) return next(new AppError('Token is invalid', 400));
  user.emailVerificationToken = undefined;
  user.verified = true;
  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Your email has been verified.',
  });
});

exports.sendVerificationEmail = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+emailVerificationToken');
  if (!user.emailVerificationToken) next(new AppError('Your email is already verified.'));

  try {
    const verifyUrl = `${req.protocol}://${req.get('host')}/api/v1/users/verifyEmail/${user.emailVerificationToken}`;

    await new Email(user, verifyUrl).sendEmailVerification();

    res.status(200).json({
      status: 'success',
      message: 'Verification email has been sent',
    });
  } catch (err) {
    return next(new AppError('There was an error sending the email. Try again later!', 500));
  }
});
