const express = require('express');

const { createBook, updateBook, getAllBooks, getBook, deleteBook } = require('../controllers/bookController');

const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.use(protect);

router.route('/').get(getAllBooks).post(restrictTo('admin'), createBook);
router.route('/:id').get(getBook).patch(restrictTo('admin'), updateBook).delete(restrictTo('admin'), deleteBook);

module.exports = router;
