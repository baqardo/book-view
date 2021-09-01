import React from 'react';
import BookList from '../BookList/BookList';

const MyBookcase = ({ bookLists }) => (
  <div className="my-bookcase">
    Books that I want to read:
    <BookList books={bookLists.wantReadBooks} />
    Books that I'm currently reading:
    <BookList books={bookLists.currentlyReadingBooks} />
    Books that I have read:
    <BookList books={bookLists.haveReadBooks} />
    Books that I liked:
    <BookList books={bookLists.likedBooks} />
  </div>
);

export default MyBookcase;
