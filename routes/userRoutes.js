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
  uploadUserPhoto,
  resizeUserPhoto,
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

router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:token', resetPassword);

router.patch('/verifyEmail/:token', verifyEmail);

router.use(protect);

router.get('/logout', logout);
router.get('/sendVerificationEmail', sendVerificationEmail);
router.patch('/updateMyPassword', updatePassword);
router.get('/me', getMe, getUser);
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);
router.delete('/deleteMe', deleteMe);

router.patch('/addLikedBooks', addLikedBook);
router.patch('/removeLikedBooks', removeLikedBook);
router.patch('/addWantReadBooks', addToReadBook);
router.patch('/removeWantReadBooks', removeToReadBook);
router.patch('/addHaveReadBooks', addHaveReadBook);
router.patch('/removeHaveReadBooks', removeHaveReadBook);
router.patch('/addCurrentlyReadingBooks', addCurrentlyReadingBook);
router.patch('/removeCurrentlyReadingBooks', removeCurrentlyReadingBook);

//! Routes only for admin
router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
