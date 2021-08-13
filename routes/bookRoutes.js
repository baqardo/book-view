const express = require('express');

const {
  createBook,
  updateBook,
  getAllBooks,
  getBook,
  deleteBook,
  getBookByField,
  onlyOLID,
} = require('../controllers/bookController');

const { protect, restrictTo, verified } = require('../controllers/authController');

const router = express.Router();

router.post('/autoGenerate', protect, verified, onlyOLID, createBook);
router.route('/').get(getAllBooks).post(protect, restrictTo('admin'), createBook);
router
  .route('/:id')
  .get(getBook)
  .patch(protect, restrictTo('admin'), updateBook)
  .delete(protect, restrictTo('admin'), deleteBook);
router.route('/:fieldName/:fieldValue').get(getBookByField);

module.exports = router;
