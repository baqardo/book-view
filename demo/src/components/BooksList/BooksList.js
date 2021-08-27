import React from 'react';
import { Link } from 'react-router-dom';

const BooksList = ({ books }) => (
  <ul style={{ display: 'flex', overflowX: 'auto', listStyle: 'none', alignItems: 'flex-end' }}>
    {books.map(el => (
      <li key={el.OLID}>
        <Link to={`/book/${el.OLID}/author/${el.author}`}>
          <img src={`http://covers.openlibrary.org/b/id/${el.coverID}-M.jpg`} alt={el.title} />
        </Link>
      </li>
    ))}
  </ul>
);

export default BooksList;
