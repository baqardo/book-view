const Book = require('../models/bookModel');
const factory = require('./handlerFactory');

exports.createBook = factory.createOne(Book);
exports.updateBook = factory.updateOne(Book);
exports.getAllBooks = factory.getAll(Book);
exports.getBook = factory.getOne(Book);
exports.deleteBook = factory.deleteOne(Book);
