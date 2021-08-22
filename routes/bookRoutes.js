const express = require('express');
const userRouter = require('./userRoutes');

const {
  createBook,
  updateBook,
  getAllBooks,
  getBook,
  deleteBook,
  getBookByField,
  onlyBasicData,
} = require('../controllers/bookController');

const { protect, restrictTo, verified } = require('../controllers/authController');

const router = express.Router();

router.use('/:bookId/users', userRouter);

router.post('/autoGenerate', protect, verified, onlyBasicData, createBook);
router.route('/').get(getAllBooks).post(protect, restrictTo('admin'), createBook);
router
  .route('/:id')
  .get(getBook)
  .patch(protect, restrictTo('admin'), updateBook)
  .delete(protect, restrictTo('admin'), deleteBook);
router.route('/:fieldName/:fieldValue').get(getBookByField);

module.exports = router;
