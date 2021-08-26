import React from 'react';
import BooksList from '../BooksList/BooksList';

const MyBookcase = ({ booksLists }) => (
  <div className="my-bookcase">
    Books that I want to read:
    <BooksList books={booksLists.wantReadBooks} />
    Books that I'm currently reading:
    <BooksList books={booksLists.currentlyReadingBooks} />
    Books that I have read:
    <BooksList books={booksLists.haveReadBooks} />
    Books that I liked:
    <BooksList books={booksLists.likedBooks} />
  </div>
);

export default MyBookcase;
