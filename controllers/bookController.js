const Book = require('../models/bookModel');
const factory = require('./handlerFactory');
const filterObj = require('../utils/filterObj');

exports.onlyBasicData = (req, res, next) => {
  const filteredBody = filterObj.holdFields(req.body, 'OLID', 'title', 'coverID', 'author');
  req.body = filteredBody;
  next();
};

exports.createBook = factory.createOne(Book);
exports.updateBook = factory.updateOne(Book);
exports.getAllBooks = factory.getAll(Book);
exports.getBook = factory.getOne(Book, { path: 'reviews', populate: { path: 'user', model: 'User' } });
exports.getBookByField = factory.getOneByField(Book, {
  path: 'reviews',
  populate: { path: 'user', model: 'User', select: 'name photo -_id ' },
});
exports.deleteBook = factory.deleteOne(Book);
