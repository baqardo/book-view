import React from 'react';
import './Book.scss';
import { Link } from 'react-router-dom';

const Book = ({ id, author, cover, title }) => (
  <Link to={`/book/${id}/author/${author}`}>
    <img src={cover} alt={title} />
  </Link>
);

export default Book;
