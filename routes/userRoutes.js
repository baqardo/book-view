const express = require('express');
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
  getMe,
  updateMe,
  deleteMe,
  addLikedBook,
  removeLikedBook,
  addToReadBook,
  removeToReadBook,
  addHaveReadBook,
  removeHaveReadBook,
  addCurrentlyReadingBook,
  removeCurrentlyReadingBook,
} = require('../controllers/userController');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  restrictTo,
  updatePassword,
  verifyEmail,
  sendVerificationEmail,
  logout,
} = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:token', resetPassword);

router.patch('/verifyEmail/:token', verifyEmail);

router.use(protect);

// router.get("/logout", logout);
router.get('/sendVerificationEmail', sendVerificationEmail);
router.patch('/updateMyPassword', updatePassword);
router.get('/me', getMe, getUser);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);

router.patch('/addLikeBook', addLikedBook);
router.patch('/removeLikeBook', removeLikedBook);
router.patch('/addWantReadBook', addToReadBook);
router.patch('/removeWantReadBook', removeToReadBook);
router.patch('/addHaveReadBook', addHaveReadBook);
router.patch('/removeHaveReadBook', removeHaveReadBook);
router.patch('/addReadingNowBook', addCurrentlyReadingBook);
router.patch('/removeReadingNowBook', removeCurrentlyReadingBook);

//! Routes only for admin
router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
