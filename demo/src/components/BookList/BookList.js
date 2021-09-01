import React from 'react';
import Book from '../Book/Book';

const BookList = ({ books }) => (
  <ul>
    {books.map(book => (
      <Book data={book} key={book.OLID} />
    ))}
  </ul>
);

export default BookList;
