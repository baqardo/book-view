const express = require('express');

const {
  createReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
  setUserId,
  checkIfBelong,
} = require('../controllers/reviewController');

const { protect, restrictTo, verified } = require('../controllers/authController');

const router = express.Router();

router.use(protect, verified);

router.route('/').get(getAllReviews).post(setUserId, createReview);
// router.route('/').get(getAllReviews).post(restrictTo('user'), setUserId, createReview);
router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), checkIfBelong, updateReview)
  .delete(restrictTo('user', 'admin'), checkIfBelong, deleteReview);

module.exports = router;
