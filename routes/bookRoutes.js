const express = require('express');

const {
  createBook,
  updateBook,
  getAllBooks,
  getBook,
  deleteBook,
  getBookByField,
} = require('../controllers/bookController');

const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.route('/').get(getAllBooks).post(protect, restrictTo('admin'), createBook);
router
  .route('/:id')
  .get(getBook)
  .patch(protect, restrictTo('admin'), updateBook)
  .delete(protect, restrictTo('admin'), deleteBook);
router.route('/:fieldName/:fieldValue').get(getBookByField);

module.exports = router;
