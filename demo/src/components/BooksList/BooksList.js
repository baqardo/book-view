import React from 'react';
import { Link } from 'react-router-dom';

const BooksList = ({ books }) => (
  <ul>
    {books.map(el => (
      <li key={el.OLID}>
        <Link to={`/book/${el.OLID}/author/${el.author}`}>
          <img src={`http://covers.openlibrary.org/b/olid/${el.coverID}-M.jpg`} alt={el.title} />
        </Link>
      </li>
    ))}
  </ul>
);

export default BooksList;
